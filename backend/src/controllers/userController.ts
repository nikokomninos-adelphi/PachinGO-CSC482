/**
 * userController
 *
 * Contains logic relating to the /api/users endpoint.
 * Handles anything realted to user profiles
 */

import type { Request, Response } from "express";
import UserInfo from "../models/UserInfo.ts";

export const getUser = async (req: Request, res: Response) => {
  try {
    const username = req.query.username;
    console.log(username);
    const populated = await UserInfo.find().populate({ path: "user", match: { username: username } });
    const filter = populated.filter((info) => info.user);
    const result = filter[0];

    if(!result) {
      return res.status(404).json({ result : "Not Found" });
    }

    return res.status(304).json({ result: result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
