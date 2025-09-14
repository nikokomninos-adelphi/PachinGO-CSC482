/**
 * testController
 * 
 * Holds logic for a test GET request, used
 * to make the backend is running 
 */

export const hello = async (req, res) => {
  res.json({ message: "Hello" });
};