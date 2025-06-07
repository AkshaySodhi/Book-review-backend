import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true, // User's full name is mandatory
    },
    userName: {
        type: String,
        required: true,
        unique: true // Username must be unique
    },
    password: {
        type: String,
        required: true,
        minLength: 6, // Password minimum length 6 chars
    }
});

const User = mongoose.model("User", UserSchema);
export default User;
