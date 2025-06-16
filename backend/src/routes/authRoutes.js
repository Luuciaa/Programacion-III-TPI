import { Router } from "express";
import { loginUser, registerUser } from "../services/auth.services.js";

const router = Router();

// Public routes
router.post("/register", registerUser);   // Membership registration
router.post("/login", loginUser);         // Login

export default router;
