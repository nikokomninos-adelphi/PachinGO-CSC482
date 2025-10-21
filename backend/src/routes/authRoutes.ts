/**
 * authRoutes
 * 
 * Contains routes pertaining to user accounts.
 * 
 * Uses the functions defined in authController.ts
 */

import express from "express";
import { registerUser, loginUser, logoutUser, checkAuth } from "../controllers/authController.ts";
import { verifyJWT } from "../middleware/verifyJWT.ts";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.get("/check", verifyJWT, checkAuth);

export default router;
