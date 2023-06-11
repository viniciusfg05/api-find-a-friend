import { env } from '@/env'
import AWS from 'aws-sdk'
import { FastifyRequest, FastifyReply } from 'fastify'
import { Multer } from 'multer'

interface FastifyMulterResponse extends FastifyRequest {
  file?: Multer
}

const s3 = new AWS.S3({})

export async function deleteUpload(
  req: FastifyMulterResponse,
  reply: FastifyReply,
) {
  const { filename } = req.params as { filename: string }

  function deleteImageAws(imageKey: string) {
    return s3
      .deleteObject({
        Bucket: env.BUCKET_NAME,
        Key: imageKey,
      })
      .promise()
  }

  deleteImageAws(filename)
}
