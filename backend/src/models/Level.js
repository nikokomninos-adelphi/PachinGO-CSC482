/**
 * Level
 * 
 * Schema for a MongoDB document that
 * stores a level and its attributes
 */

import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 1, max: 50 },
  thumbnail: { type: String, required: true },
  pegLayout: { type: Object, required: true },
  backgroundImage: { type: String, required: true },
  numOrange: { type: Number, required: true },
  uiColors: { type: Object, required: true },
  dateUploaded: { type: Date, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  downloads: { type: Number },
  scores: { type: Object }
});

export default mongoose.model("Level", levelSchema);