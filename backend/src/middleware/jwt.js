/**
 * jwt.js
 * 
 * Middleware to retrieve a user's account info
 * To be used in a protected route 
 */

import jwt from "jsonwebtoken";

/**
 * Middleware to verify a JWT token
 * @param {import('express').Request} req 
 * @param {import('express'.Response)} res 
 * @param {import('express').NextFunction} next 
 * @returns {void}
 */
const verifyToken = (req, res, next) => {
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

export default verifyToken;