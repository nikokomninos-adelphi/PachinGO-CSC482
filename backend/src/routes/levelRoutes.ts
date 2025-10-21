/**
 * levelRoutes
 *
 * Contains routes pertaining to level database interaction
 *
 * Uses the functions defined in levelController.ts
 */

import express from "express";
import { deleteLevel } from "../controllers/levelController.ts";

const router = express.Router();

router.post("/deleteLevel", deleteLevel);

export default router;
