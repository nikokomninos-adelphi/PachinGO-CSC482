/**
 * testRoutes
 * 
 * Contains routes used for testing if the 
 * backend is running.
 * 
 * Uses the functions defined in testController.js
 */

import express from "express";
import { hello } from "../controllers/testController.js";

const router = express.Router();

router.get("/", hello);

export default router;