/**
 * UserInfo
 * 
 * Schema for a MongoDB document that
 * stores a user's info regarding various
 * game features (i.e. links to their created
 * levels, number of levels made)
 */

import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  dateJoined: { type: Date, required: true },
  role: { type: String, required: true },
  likedLevels: { type: [Number], required: true },
});

export default mongoose.model("UserInfo", userInfoSchema);
