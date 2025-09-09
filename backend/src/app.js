import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import testRoutes from "./routes/testRoutes.js"

const API_BASE_URL = "http://localhost:3000";

const app = express();

app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000", "https://preview.construct.net"]
}));
app.use("/api/hello", testRoutes);

export default app;