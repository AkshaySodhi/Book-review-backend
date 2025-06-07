import express from "express";
import { search } from "../controllers/search.controller.js";
import { validateSearchQuery } from "../middleware/validators.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

// Search books by title or author (query param 'q' required)
router.get('/', validateSearchQuery, validateRequest, search);

export default router;
