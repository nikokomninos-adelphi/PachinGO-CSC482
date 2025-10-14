/**
 * searchRoutes
 * 
 * Contains routes pertaining to level search
 * 
 * Uses the functions defined in searchController.ts
 */

import express from "express";
import { searchLevels } from "../controllers/searchController.ts";

const router = express.Router();

router.post("/searchLevels", searchLevels);

export default router;
