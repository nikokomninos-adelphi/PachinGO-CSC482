/**
 * testController
 * 
 * Holds logic for a test GET request, used
 * to make the backend is running at /api/ 
 */

import type { Request, Response } from "express";

export const hello = async (req: Request, res: Response) => {
  res.json({ message: "Hello" });
};
