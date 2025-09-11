import User from "../models/User.js";

export const loginUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(401).json({ message: "User does not exist" });
  }

  res.json({ message: `Hello ${user.username}`});
};