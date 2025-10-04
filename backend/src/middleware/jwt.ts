/**
 * jwt.js
 * 
 * Middleware to retrieve a user's account info
 * To be used in a protected route 
 */

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware to verify a JWT token
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {void}
 */
/*const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

export default verifyToken;*/