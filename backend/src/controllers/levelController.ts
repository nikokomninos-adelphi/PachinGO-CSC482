/**
 * levelController
 *
 * Contains logic relating to the /api/level endpoint
 * Handles anything related to database level updates
 */

import type { Request, Response } from "express";
import Level from "../models/Level.ts";
import { uploadToR2 } from "../config/r2.ts";
import multer from "multer";

const upload = multer();

/**
 * deleteLevel
 *
 * Deletes a level from the database document "levels"
 * @param {Request} req a request body containing: levelID
 * @param {Response} res a response body containing: message
 */
export const deleteLevel = async (req: Request, res: Response) => {
  try {
    const result = await Level.deleteOne({ levelID: req.body.levelID });

    if (!result) {
      return res.status(204).json({ message: "Level not deleted" });
    }

    return res.status(200).json({ message: "Level deleted successfuly" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * uploadLevel
 *
 * Uploads a level to the database document "levels"
 * @param {Request} req a request body containing: name, author, desc, pegLayout
 * @param {Response} res a response body containing: message
 */
export const uploadLevel = [
  upload.fields([
    { name: "background", maxCount: 1 },
    { name: "name", maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    try {
      const { name, author, desc, pegLayout } = req.body;
      let backgroundUrl: string | null = null;
      let musicUrl: string | null = null;

      // If a background image is included
      if (req.files && "background" in req.files) {
        const bgFile = (req.files as any)["background"][0];
        backgroundUrl = await uploadToR2(bgFile);
      }

      // If a music file is included
      if (req.files && "music" in req.files) {
        const musicFile = (req.files as any)["music"][0];
        musicUrl = await uploadToR2(musicFile);
      }

      const newLevel = new Level({
        name: name,
        author: author,
        description: desc,
        pegLayout: pegLayout,
      });
      await newLevel.save();

      return res.status(201).json({
        message: "Level uploaded successfully",
        backgroundUrl,
        musicUrl,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];
