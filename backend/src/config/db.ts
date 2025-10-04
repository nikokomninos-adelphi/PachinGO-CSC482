/**
 * db.js
 * 
 * Contains logic to start bootstrap connection
 * to remote MongoDB database (MongoDB Atlas)
 */

import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected");
  } catch (e: any) {
    console.error("MongoDB connection failed: ", e.message);
    process.exit(1);
  }
};

export default connectDB;