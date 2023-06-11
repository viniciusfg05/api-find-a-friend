import { env } from '@/env'
import { S3Client } from '@aws-sdk/client-s3'

export const s3 = new S3Client({
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
  region: env.AWS_DEFAULT_REGION,
})
