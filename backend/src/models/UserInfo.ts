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
  levels: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: "Level" }]
});

export default mongoose.model("UserInfo", userInfoSchema);
