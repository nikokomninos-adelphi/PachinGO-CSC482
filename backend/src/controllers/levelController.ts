/**
 * levelController
 *
 * Contains logic relating to the /api/level endpoint
 * Handles anything related to database level updates
 */

import type { Request, Response } from "express";
import Level from "../models/Level.ts";
import Counter from "../models/Counter.ts";
import { removeFromR2, uploadThumbnailToR2, uploadToR2 } from "../config/r2.ts";
import multer from "multer";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import os from "os";
import { PYTHON_PATH, SCRIPT_PATH } from "../config/env.ts";

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

    removeFromR2(`bg-image/${req.body.levelID}`);
    removeFromR2(`bg-audio/${req.body.levelID}`);
    removeFromR2(`thumbnail/${req.body.levelID}.png`);

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
 * @param {Request} req a request body containing: name, author, desc, pegLayout;
 * and a request upload containing: background, music
 * @param {Response} res a response body containing: message
 */
export const uploadLevel = [
  upload.fields([
    { name: "background", maxCount: 1 },
    { name: "music", maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    try {
      const {
        name,
        author,
        desc,
        pegLayout,
        backgroundImageOpacity,
        backgroundImageHSL,
        musicSelect,
        wallHSL,
        scoreHSL,
        crystalHSL,
        numOrange,
      } = req.body;
      let backgroundUrl: string = "N/A";
      let musicUrl: string = "N/A";
      let thumbnailUrl: string = "N/A";

      const counter = await Counter.findOne({});
      const levelID = (counter?.seq ?? 0) + 1;
      const dateUploaded = new Date();

      // Helper to generate thumbnails
      const runThumbnailGeneration = (
        pythonPath: any,
        scriptPath: any,
        args: any,
      ) => {
        return new Promise<void>((resolve, reject) => {
          const process = spawn(
            pythonPath,
            [path.join(scriptPath, "thumbnail.py"), ...args],
            {
              cwd: scriptPath,
            },
          );

          process.stdout.on("data", (data) => console.log(data.toString()));
          process.stderr.on("data", (err) => console.error(err.toString()));

          process.on("close", (code) => {
            console.log(`Python exited with code ${code}`);
            if (code === 0) resolve();
            else reject(new Error(`Python script exited with code ${code}`));
          });
        });
      };

      // If a background image is included
      if (req.files && "background" in req.files) {
        const bgFile = (req.files as any)["background"][0];
        backgroundUrl = await uploadToR2(
          bgFile,
          "bg-image",
          levelID!.toString(),
        );

        // Create temp dir to save background file
        const tempDir = os.tmpdir();
        const tempPath = path.join(
          tempDir,
          `${levelID}-${bgFile.originalname}`,
        );
        fs.writeFileSync(tempPath, bgFile.buffer);

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        //const pythonPath = path.resolve(__dirname, "../../scripts", PYTHON_PATH!);
        const pythonPath = path.resolve(__dirname, PYTHON_PATH!);
        const scriptPath = path.resolve(__dirname, SCRIPT_PATH!);

        const outputFileName = `thumbnail_${levelID}.png`;

        await runThumbnailGeneration(pythonPath, scriptPath, [
          tempPath,
          pegLayout,
          backgroundImageOpacity,
          backgroundImageHSL,
          outputFileName,
        ]);

        thumbnailUrl = await uploadThumbnailToR2(
          path.join(scriptPath, outputFileName),
          levelID!.toString(),
        );

        fs.unlink(tempPath, (err) => {
          if (err) console.error("Failed to delete temp file:", err);
        });

        fs.unlink(path.join(scriptPath, outputFileName), (err) => {
          if (err) console.error("Failed to delete thumbnail:", err);
        });
      } else {
        // If there is no user-uploaded background image,
        // still generate the thumbnail
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const pythonPath = path.resolve(__dirname, PYTHON_PATH!);
        const scriptPath = path.resolve(__dirname, SCRIPT_PATH!);
        const outputFileName = `thumbnail_${levelID}.png`;

        await runThumbnailGeneration(pythonPath, scriptPath, [
          "",
          pegLayout,
          backgroundImageOpacity,
          backgroundImageHSL,
          outputFileName,
        ]);

        thumbnailUrl = await uploadThumbnailToR2(
          path.join(scriptPath, outputFileName),
          levelID!.toString(),
        );

        fs.unlink(path.join(scriptPath, outputFileName), (err) => {
          if (err) console.error("Failed to delete thumbnail:", err);
        });
      }

      // If a music file is included
      if (req.files && "music" in req.files) {
        const musicFile = (req.files as any)["music"][0];
        musicUrl = await uploadToR2(musicFile, "bg-audio", levelID!.toString());
      }

      const newLevel = new Level({
        name: name,
        author: author,
        description: desc,
        thumbnail: thumbnailUrl,
        pegLayout: JSON.parse(pegLayout),
        backgroundImage: backgroundUrl,
        backgroundImageOpacity: backgroundImageOpacity,
        backgroundImageHSL: JSON.parse(backgroundImageHSL),
        backgroundMusic: musicUrl,
        musicSelect: musicSelect,
        wallHSL: JSON.parse(wallHSL),
        scoreHSL: JSON.parse(scoreHSL),
        crystalHSL: JSON.parse(crystalHSL),
        numOrange: numOrange,
        dateUploaded: dateUploaded,
      });
      await newLevel.save();

      /*
      const user = await User.findOne({ username: author });
      await UserInfo.updateOne(
        { user: user!._id },
        { $push: { levels: levelID } },
      );
      */

      return res.status(201).json({
        message: "Level uploaded successfully",
        backgroundUrl,
        musicUrl,
        levelID,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

/**
 * loadLevel
 *
 * Retrieves a level's info, to be loaded into Construct
 * @param {Request} req a request body containing: levelID
 * @param {Response} res a response body containing: message, level
 */
export const loadLevel = async (req: Request, res: Response) => {
  try {
    const level = await Level.findOne({ levelID: req.query.levelID });

    if (!level) {
      return res.status(204).json({ message: "Level not found" });
    }

    return res.status(200).json({ message: "Level found", level });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
