import express from "express";
import { updateReview, deleteReview } from "../controllers/review.controller.js";

import { validateObjectId, validateReview } from "../middleware/validators.js";
import validateRequest from "../middleware/validateRequest.js";

import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Update a review by ID (authenticated users only)
router.put("/:id", protectRoute, validateObjectId, validateReview, validateRequest, updateReview);

// Delete a review by ID (authenticated users only)
router.delete("/:id", protectRoute, validateObjectId, validateRequest, deleteReview);

export default router;
