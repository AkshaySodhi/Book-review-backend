import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to User who wrote the review
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book", // Reference to the reviewed Book
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5, // Rating between 1 and 5
        required: true
    },
    comment: {
        type: String,
        maxLength: 300 // Optional comment max 300 chars
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt

const Review = mongoose.model("Review", ReviewSchema);
export default Review;

