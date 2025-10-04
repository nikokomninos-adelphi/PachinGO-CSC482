/**
 * app.js
 * 
 * Bootstraps backend, including:
 * - DB connection
 * - Express server creation
 * - Express server routes
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.ts";

import testRoutes from "./routes/testRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://preview.construct.net",
      "https://pachingo.onrender.com",
      "https://playpachingo.vercel.app"
    ],
  })
);
app.use("/api", testRoutes);
app.use("/api/users", userRoutes);

export default app;
