import { body, param, query } from "express-validator";

// Validation rules for user signup
export const validateSignup = [
    body("fullName").notEmpty().withMessage("Fullname is required"),
    body("userName").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
];

// Validation rules for user login
export const validateLogin = [
    body("userName").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
];

// Validation rules for adding a new book
export const validateBook = [
    body("title").notEmpty().withMessage("Title is required"),
    body("author").notEmpty().withMessage("Author is required"),
    body("genre").notEmpty().withMessage("Genre is required"),
];

// Validation rules for submitting or updating a review
export const validateReview = [
    body("rating")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be an integer between 1 and 5"),
    body("comment").isLength({ min: 5 }).withMessage("Comment must be at least 5 characters"),
];

// Validation for MongoDB ObjectId params in route URLs
export const validateObjectId = [
    param("id").isMongoId().withMessage("Invalid ID format"),
];

// Validation for search query parameter 'q'
export const validateSearchQuery = [
    query("q")
        .trim()
        .notEmpty()
        .withMessage("Search query parameter 'q' is required"),
];
