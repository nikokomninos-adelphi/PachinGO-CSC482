/**
 * levelRoutes
 *
 * Contains routes pertaining to level database interaction
 *
 * Uses the functions defined in levelController.ts
 */

import express from "express";
import { deleteLevel, uploadLevel } from "../controllers/levelController.ts";

const router = express.Router();

router.post("/deleteLevel", deleteLevel);
router.post("/uploadLevel", uploadLevel);

export default router;
