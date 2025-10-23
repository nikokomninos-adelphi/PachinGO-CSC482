/**
 * levelController
 *
 * Contains logic relating to the /api/level endpoint
 * Handles anything related to database level updates
 */

import type { Request, Response } from "express";
import Level from "../models/Level.ts";

/**
 * deleteLevel
 *
 * Deletes a level from the database
 * @param {Request} req a request body containing: levelID
 * @param {Response} res a response body containing: message
 */
export const deleteLevel = async (req: Request, res: Response) => {
  try {
    const result = await Level.deleteOne({ levelID: req.body.levelID });

    if (!result) {
      return res.status(204).json({ message: "Level not deleted" });
    }

    return res.status(200).json({ message: "Level deleted successfuly"} );

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const uploadLevel = async (req: Request, res: Response) => {
  try {
    const { name, author, desc, pegLayout } = req.body;
    await Level.create({
      name: name,
      author: author,
      description: desc,
      pegLayout: pegLayout
    });
    return res.status(201).json({ message: "Level uploaded successfully" });

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
