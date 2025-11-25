import { S3Client } from '@aws-sdk/client-s3';

export const createS3Client = (): S3Client => {
  return new S3Client({
    region: process.env.S3_REGION || 'ru-1',
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    forcePathStyle: true,
  });
};

export const s3Config = {
  bucket: process.env.S3_BUCKET_NAME || '',
  region: process.env.S3_REGION || 'ru-1',
  publicUrl: process.env.S3_PUBLIC_URL || '',
};
