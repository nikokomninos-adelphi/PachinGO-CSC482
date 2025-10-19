/**
 * userRoutes
 *
 * Contains routes pertaining to user profiles
 *
 * Uses the functions defined in searchController.ts
 */

import express from "express";
import { getUser } from "../controllers/userController.ts";

const router = express.Router();

router.get("/getUser", getUser);

export default router;
