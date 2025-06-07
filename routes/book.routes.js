import express from "express";
import { addBook, getBookById, getBooks, addBookReview } from "../controllers/book.controller.js";

import {
    validateBook,
    validateReview,
    validateObjectId,
} from "../middleware/validators.js";
import validateRequest from "../middleware/validateRequest.js";

import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Get list of books with optional filters and pagination
router.get("/", getBooks);

// Get details of a single book by ID (with validation)
router.get("/:id", validateObjectId, validateRequest, getBookById)

// Add a new book (authenticated users only)
router.post("/", protectRoute, validateBook, validateRequest, addBook);

// Add a review to a book by ID (authenticated users only)
router.post("/:id/reviews", protectRoute, validateObjectId, validateReview, validateRequest, addBookReview);

export default router;
