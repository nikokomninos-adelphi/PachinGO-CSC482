/**
 * levelRoutes
 *
 * Contains routes pertaining to level database interaction
 *
 * Uses the functions defined in levelController.ts
 */

import express from "express";
import {
  deleteLevel,
  loadLevel,
  uploadLevel,
  addPlayToLevel,
  addLikeToLevel,
  removeLikeFromLevel,
} from "../controllers/levelController.ts";

const router = express.Router();

router.post("/deleteLevel", deleteLevel);
router.post("/uploadLevel", uploadLevel);
router.get("/loadLevel", loadLevel);
router.post("/addPlayToLevel", addPlayToLevel);
router.post("/addLikeToLevel", addLikeToLevel);
router.post("/removeLikeFromLevel", removeLikeFromLevel);

export default router;
