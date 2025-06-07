import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokenSetCookie.js";

// Register a new user
export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "passwords dont match" });
        }

        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({ error: "username already exists" });
        }

        // Securely hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
        });

        if (newUser) {
            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (err) {
        console.error("error in signup controller: ", err);
        res.status(500).json({ error: "internal server error" });
    }
};

// Authenticate user and set JWT cookie
export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await User.findOne({ userName });

        // Validate password only if user exists
        const correctPassword = await bcrypt.compare(
            password,
            user?.password || ""
        );

        if (!user || !correctPassword) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Set JWT cookie for authenticated session
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
        });
    } catch (err) {
        console.error("error in login contrll: ", err);
        res.status(500).json({ error: "internal server error" });
    }
};
