import { Schema, model } from "mongoose";

/**
 * User
 * 
 * Schema for a MongoDB document that
 * stores user account credentials info.
 */

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, min: 5, max: 50 },
  password: { type: String, required: true, min: 5, max: 50 },
});

export default model("User", userSchema);
