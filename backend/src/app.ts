/**
 * app.js
 * 
 * Bootstraps backend, including:
 * - DB connection
 * - Express server creation
 * - Express server routes
 */

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.ts";

import testRoutes from "./routes/testRoutes.ts";
import authRoutes from "./routes/authRoutes.ts";
import searchRoutes from "./routes/searchRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import levelRoutes from "./routes/levelRoutes.ts"
//import { populateUserInfo } from "./config/populate.ts";
//import { populateLevels } from "./config/populate.ts";

connectDB();
//populateLevels();
//populateUserInfo();

const PORT = process.env.PORT || 3000;
const app = express();

app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://preview.construct.net",
      "https://pachingo.onrender.com",
      "https://playpachingo.vercel.app",
    ],
    credentials: true,
  })
);
app.use("/api/v1", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/level", levelRoutes);

app.listen(PORT, () => console.log(`Sever running on Port ${PORT}`));
