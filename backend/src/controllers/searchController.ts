/**
 * searchController
 *
 * Contans logic relating to the /api/search endpoint
 * Handles logic regarding level search functionality
 */

import type { Request, Response } from "express";
import Level from "../models/Level.ts";
import UserInfo from "../models/UserInfo.ts";

/**
 * searchLevels
 *
 * Returns a paginated search result given a search term
 * The request body will determine what page of the
 * results to display
 *
 * @param {Request} req, contains HTTP body with: page, limit
 * @param {Response} res, contains HTTP body with: status code, results,
 * current page, total page
 * @returns an HTTP status code of 204 if no results, 200 and a response body if success,
 * 500 and error otherwise
 */
export const searchLevels = async (req: Request, res: Response) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 25;
    const skip = ((page as number) - 1) * (limit as number);
    //Regex for a case-insensitive match
    const total = (await Level.find({ name: new RegExp(req.body.term, "i") })).length;
    const results = await Level.find({ name: new RegExp(req.body.term, "i") })
      .skip(skip)
      .limit(limit as number);

    if (!results) {
      return res.status(204).json({ message: "No results" });
    }

    res.status(200).json({
      results,
      total,
      totalPages: Math.ceil(total / (limit as number)),
      currentPage: page as number,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const searchUsers = async (req: Request, res: Response) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 25;
    const skip = ((page as number) - 1) * (limit as number);
    const populated = await UserInfo.find()
      .populate({
        path: "user",
        match: { username: new RegExp(req.body.term, "i") },
      })
      .skip(skip)
      .limit(limit as number);
    const filtered = populated.filter(info => info.user);

    // Then handle pagination manually
    const total = filtered.length;
    const results = filtered.slice(skip, skip + (limit as number));

    if (!results) {
      return res.status(204).json({ message: "No results" });
    }

    res.status(200).json({
      results,
      total,
      totalPages: Math.ceil(total / (limit as number)),
      currentPage: page as number,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
