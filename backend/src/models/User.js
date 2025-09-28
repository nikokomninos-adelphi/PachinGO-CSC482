/**
 * User
 * 
 * Schema for a MongoDB document that
 * stores user account credentials info.
 */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, min: 5, max: 50 },
  password: { type: String, required: true, min: 5, max: 50 },
});

export default mongoose.model("User", userSchema);
