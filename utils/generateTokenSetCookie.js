import jwt from "jsonwebtoken";

// Generate JWT token and set it as an HTTP-only cookie
const generateTokenAndSetCookie = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Token expires in 1 day
  });

  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development", // HTTPS only in prod
  });
};

export default generateTokenAndSetCookie;
