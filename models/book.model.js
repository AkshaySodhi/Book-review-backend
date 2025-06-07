import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Title is mandatory
    },
    author: {
        type: String,
        required: true, // Author is mandatory
    },
    genre: {
        type: String, // Optional genre field
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review" // References Review documents
    }]
});

const Book = mongoose.model("Book", BookSchema);
export default Book;

