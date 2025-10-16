import Level from "../models/Level.ts";

const populateLevels = async () => {
  for (let i = 1; i <= 100; i++) {
    const newLevel = new Level({
      name: "Level " + i,
      author: "Author " + i,
      description: "Desc " + i,
    });
    await newLevel.save();
  }
}

export default populateLevels;
