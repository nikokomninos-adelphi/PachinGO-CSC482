/**
 * userController
 *
 * Contains logic relating to the /api/users endpoint.
 * Handles user registration and login
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

/**
 * Register a user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const registerUser = async (req, res) => {
  try {
    // Checks if username and password meet requirements
    if (req.body.username.length < 5 || req.body.password.length < 5) {
      return res.status(400).json({
        error: "Username and password must be at least 5 characters",
      });
    }
    if (req.body.username.length > 50 || req.body.password.length > 50) {
      return res.status(400).json({
        error: "Username and password must be less than 50 characters",
      });
    }

    // Check if username already exists
    const exisitngUser = await User.findOne({ username: req.body.username });
    if (exisitngUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Log a user in
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare inputted password to actual hashed password
    const compPasswords = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!compPasswords) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token for authentication
    const token = jwt.sign({ username: user.username }, "secret");
    res.status(200).json({ message: "Login successful", token });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};
