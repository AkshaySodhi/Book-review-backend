import { validationResult } from "express-validator";

// Middleware to handle validation result from express-validator
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    // If validation errors exist, return 400 with error details
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    next();
};

export default validateRequest;
