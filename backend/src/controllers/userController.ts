/**
 * userController
 *
 * Contains logic relating to the /api/users endpoint.
 * Handles anything realted to user profiles
 */

import type { Request, Response } from "express";
import UserInfo from "../models/UserInfo.ts";
import Level from "../models/Level.ts";

/**
 *
 */
export const getUser = async (req: Request, res: Response) => {
  try {
    const username = req.query.username;
    const populated = await UserInfo.find().populate({
      path: "user",
      match: { username: username },
    });
    const filter = populated.filter((info) => info.user);
    const result = filter[0];

    if (!result) {
      return res.status(404).json({ result: "Not Found" });
    }

    return res.status(200).json({ result: result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ result: "Internal server error" });
  }
};

export const getUserLevels = async (req: Request, res: Response) => {
  // TODO edit this when level uploading is implemented
  // Move this into getUser. Rename to getUserInfo
  try {
    const username = req.query.username;
    const results = await Level.find({ author: username });

    if (!results) {
      return res.status(204).json({ message: "No results" });
    }

    res.status(200).json({
      results,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
