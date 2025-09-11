import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import testRoutes from "./routes/testRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const API_BASE_URL = "http://localhost:3000";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "https://preview.construct.net"]
}));
app.use(testRoutes);
app.use("/api/users", userRoutes);

export default app;