import Level from "../models/Level.ts";
import User from "../models/User.ts";
import UserInfo from "../models/UserInfo.ts";

export const populateLevels = async () => {
  for (let i = 1; i <= 100; i++) {
    const newLevel = new Level({
      name: "Level " + i,
      author: "Author " + i,
      description: "Desc " + i,
    });
    await newLevel.save();
  }
}

export const populateUserInfo = async () => {
  const allUsers = await User.find();
  for (let i = 0; i < allUsers.length; i++) {
    const newUserInfo = new UserInfo({
      user: allUsers[i]
    })
    await newUserInfo.save();
  }
}
