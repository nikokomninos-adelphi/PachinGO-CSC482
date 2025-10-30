/**
 * r2.ts - connects the project to a Cloudflare R2
 * bucket for media storage (i.e. level backgrounds,
 * level thumbnails, and level background music)
 *
 * Provides functions for uploading to the R2 bucket
 *
 * We used to ChatGPT to generate this, as we did not understand
 * how to work with the AWS SDK.
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME } from "./env.ts";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: `${R2_ACCESS_KEY_ID}`,
    secretAccessKey: `${R2_SECRET_ACCESS_KEY}`
  },
});

export const uploadToR2 = async (
  file: Express.Multer.File
): Promise<string> => {
  const key = `levels/${Date.now()}-${file.originalname}`;
  const fileBuffer = file.buffer;
  const mimeType = file.mimetype;

  const command = new PutObjectCommand({
    Bucket: `${R2_BUCKET_NAME}`,
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType,
  });

  await r2.send(command);

  // Return the public URL (if bucket has public access enabled)
  return `${R2_BUCKET_NAME}/${key}`;
}

