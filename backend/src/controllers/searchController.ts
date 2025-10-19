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
 * getRecentLevels
 *
 * Returns all levels, ordered by date uploaded, descending
 * @param {Request} req, contains HTTP body with: page, limit, term, sortType, sortOrderType
 * @param {Response} res, contains HTTP body with: status code, results,
 * current page, total pages
 * @returns an HTTP status code of 204 if no results, 200 and a response body if success,
 * 500 and error otherwise
 */
export const getRecentLevels = async (req: Request, res: Response) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 25;
    const skip = ((page as number) - 1) * (limit as number);

    const total = (await Level.find()).length;
    const results = await Level.find()
      .sort({ dateUploaded: -1 })
      .skip(skip)
      .limit(limit as number);

    res.status(200).json({
      results,
      total,
      totalPages: Math.ceil(total / (limit as number)),
      currentPage: page as number,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * getMostPlayedLevels
 *
 * Returns all levels, ordered by plays, descending
 * @param {Request} req, contains HTTP body with: page, limit, term, sortType, sortOrderType
 * @param {Response} res, contains HTTP body with: status code, results,
 * current page, total pages
 * @returns an HTTP status code of 204 if no results, 200 and a response body if success,
 * 500 and error otherwise
 */
export const getMostPlayedLevels = async (req: Request, res: Response) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 25;
    const skip = ((page as number) - 1) * (limit as number);

    const total = (await Level.find()).length;
    const results = await Level.find()
      .sort({ plays: -1 })
      .skip(skip)
      .limit(limit as number);

    res.status(200).json({
      results,
      total,
      totalPages: Math.ceil(total / (limit as number)),
      currentPage: page as number,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};


/**
 * getMostLikedLevels
 *
 * Returns all levels, ordered by liked, descending
 * @param {Request} req, contains HTTP body with: page, limit, term, sortType, sortOrderType
 * @param {Response} res, contains HTTP body with: status code, results,
 * current page, total pages
 * @returns an HTTP status code of 204 if no results, 200 and a response body if success,
 * 500 and error otherwise
 */
export const getMostLikedLevels = async (req: Request, res: Response) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 25;
    const skip = ((page as number) - 1) * (limit as number);

    const total = (await Level.find()).length;
    const results = await Level.find()
      .sort({ likes: -1 })
      .skip(skip)
      .limit(limit as number);

    res.status(200).json({
      results,
      total,
      totalPages: Math.ceil(total / (limit as number)),
      currentPage: page as number,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * searchLevelName
 *
 * Returns a paginated result given a search term,
 * based on level name.
 * The request body will determine what page of the
 * results to display
 *
 * @param {Request} req, contains HTTP body with: page, limit, term, sortType, sortOrderType
 * @param {Response} res, contains HTTP body with: status code, results,
 * current page, total pages
 * @returns an HTTP status code of 204 if no results, 200 and a response body if success,
 * 500 and error otherwise
 */
export const searchLevelName = async (req: Request, res: Response) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 25;
    const skip = ((page as number) - 1) * (limit as number);

    if (req.body.term === "$recent$") await getRecentLevels(req, res);
    if (req.body.term === "$plays$") await getMostPlayedLevels(req, res);
    if (req.body.term === "$likes$") await getMostLikedLevels(req, res);

    let sort;

    // Handle sort type and order
    switch (req.body.sortType) {
      case "date":
        switch (req.body.sortOrderType) {
          case "asc":
            sort = { dateUploaded: 1 };
            break;
          case "desc":
            sort = { dateUploaded: -1 };
            break;
        }
        break;
      case "name":
        switch (req.body.sortOrderType) {
          case "asc":
            sort = { name: 1 };
            break;
          case "desc":
            sort = { name: -1 };
            break;
        }
        break;
      case "plays":
        switch (req.body.sortOrderType) {
          case "asc":
            sort = { plays: 1 };
            break;
          case "desc":
            sort = { plays: -1 };
            break;
        }
        break;
      case "likes":
        switch (req.body.sortOrderType) {
          case "asc":
            sort = { likes: 1 };
            break;
          case "desc":
            sort = { likes: -1 };
            break;
        }
        break;
    }

    //Regex for a case-insensitive match
    const total = (await Level.find({ name: new RegExp(req.body.term, "i") }))
      .length;
    const results = await Level.find({ name: new RegExp(req.body.term, "i") })
      .sort(sort as any)
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
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * searchLevelID
 *
 * Returns a paginated result given a search term,
 * based on level name.
 * The request body will determine what page of the
 * results to display
 *
 * @param {Request} req, contains HTTP body with: page, limit, term
 * @param {Response} res, contains HTTP body with: status code, results,
 * current page, total pages
 * @returns an HTTP status code of 204 if no results, 200 and a response body if success,
 * 500 and error otherwise
 */
export const searchLevelID = async (req: Request, res: Response) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 25;
    const skip = ((page as number) - 1) * (limit as number);
    const levelID = +req.body.term;
    if (isNaN(levelID)) return res.status(204).json({ message: "Invalid ID" });
    //Regex for a case-insensitive match
    const total = (await Level.find({ levelID })).length;
    const results = await Level.find({ levelID })
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
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * searchUsers
 *
 * Returns a paginated result given a search term,
 * based on level name.
 * The request body will determine what page of the
 * results to display
 *
 * @param {Request} req, contains HTTP body with: page, limit, term
 * @param {Response} res, contains HTTP body with: status code, results,
 * current page, total pages
 * @returns an HTTP status code of 204 if no results, 200 and a response body if success,
 * 500 and error otherwise
 */
export const searchUsers = async (req: Request, res: Response) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 25;
    const skip = ((page as number) - 1) * (limit as number);

    let sort;

    // Handle sort type and order
    switch (req.body.sortType) {
      case "name":
        switch (req.body.sortOrderType) {
          case "asc":
            sort = { name: 1 };
            break;
          case "desc":
            sort = { name: -1 };
            break;
        }
        break;
    }

    const populated = await UserInfo.find()
      .populate({
        path: "user",
        match: { username: new RegExp(req.body.term, "i") },
      })
      .sort(sort as any)
      .skip(skip)
      .limit(limit as number);
    const filtered = populated.filter((info) => info.user);

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
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
