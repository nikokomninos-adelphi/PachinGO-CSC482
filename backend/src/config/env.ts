import "dotenv/config";

export const {
  PORT,
  MONGO_URI,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_ACCOUNT_ID,
  R2_BUCKET_NAME,
  PYTHON_PATH,
} = process.env as Record<string, string>;
