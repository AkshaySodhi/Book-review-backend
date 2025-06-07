import express from "express"
import { signup, login } from "../controllers/auth.controller.js";
import { validateSignup, validateLogin } from "../middleware/validators.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router()

// User registration route with input validation
router.post("/signup", validateSignup, validateRequest, signup)

// User login route with input validation
router.post("/login", validateLogin, validateRequest, login)

export default router;
