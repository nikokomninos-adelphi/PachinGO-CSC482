const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const API_BASE_URL = "http://localhost:3000";
const PORT = 3000;

const app = express();
app.use(cors({
  origin: ["http://localhost:3000", "https://preview.construct.net"]
}));

app.get("/hello", (req, res) => res.json({ message: "Parse me" }));

app.listen(PORT, () => console.log(`Sever running on Port ${PORT}`));
