/**
 * userController
 *
 * Contains logic relating to the /api/users endpoint.
 * Handles user registration and login
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { Request, Response } from "express";

import User from "../models/User.ts";

/**
 * Register a user
 * @param {Request} req
 * @param {Response} res
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    // Checks if username and password meet requirements
    if (req.body.username.length < 5 || req.body.password.length < 5) {
      return res.status(400).json({
        error: "Username and Password must be at least 5 characters",
      });
    }
    if (req.body.username.length > 50 || req.body.password.length > 50) {
      return res.status(400).json({
        error: "Username and Password must be less than 50 characters",
      });
    }
    if (req.body.username.includes(" ") || req.body.password.includes(" ")) {
      return res.status(400).json({
        error: "Username and Password cannot contain spaces",
      });
    }
    if(!/[A-Z]/.test(req.body.password)) {
      return res.status(400).json({
        error: "Password must contain at least one uppercase character",
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
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export const loginUser = async (req: Request, res: Response) => {
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
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token for authentication
    const token = jwt.sign({ username: user.username }, "secret");
    res.status(200).json({ message: "Login successful", token });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};
