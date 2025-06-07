import Book from "../models/book.model.js";
import Review from "../models/review.model.js";

// Create a new book (requires authentication)
export const addBook = async (req, res) => {
    const book = new Book(req.body);
    await book.save();

    res.status(201).json(book);
};

// Get all books with optional filtering and pagination
export const getBooks = async (req, res) => {
    const { author, genre, page = 1, limit = 10 } = req.query;
    const filter = {};

    // Case-insensitive filtering by author and genre
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = new RegExp(genre, 'i');

    const books = await Book.find(filter)
        .skip((page - 1) * limit) // Pagination: skip docs
        .limit(Number(limit));   // Pagination: limit docs

    res.status(200).json(books);
};

// Get a single book by ID, including its reviews and average rating
export const getBookById = async (req, res) => {
    const book = await Book.findById(req.params.id).populate('reviews');
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    // Calculate average rating
    const ratings = book.reviews.map(r => r.rating);
    const avg = ratings.length ? (ratings.reduce((a, b) => a + b) / ratings.length) : 0;

    res.status(200).json({
        ...book.toObject(),
        averageRating: avg.toFixed(2),
        reviews: book.reviews
    });
};

// Submit a review for a book (one per user)
export const addBookReview = async (req, res) => {
    const { rating, comment } = req.body;
    const bookId = req.params.id;

    const existing = await Review.findOne({ user: req.user.id, book: bookId });
    if (existing) {
        return res.status(400).json({ message: 'You already reviewed this book' });
    }

    const review = new Review({ user: req.user.id, book: bookId, rating, comment });
    await review.save();

    // Associate review with book
    await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });

    res.status(201).json(review);
};
