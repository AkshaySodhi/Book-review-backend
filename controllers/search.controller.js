import Book from "../models/book.model.js";

// Search books by title or author ##case-insensitive, partial match
export const search = async (req, res) => {
    const { q } = req.query;

    // Create regex
    const regex = new RegExp(q, 'i');

    const books = await Book.find({
        $or: [{ title: regex }, { author: regex }]
    });

    res.status(200).json(books);
};
