import { env } from '@/env'
import { makeUploadsUseCase } from '@/use-case/factories/make-uploads-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { Multer } from 'multer'
import { z } from 'zod'

interface FastifyMulterResponse extends FastifyRequest {
  file?: Multer
}

export async function upload(req: FastifyMulterResponse, reply: FastifyReply) {
  if (env.STORAGE_ENVIRAMENTS === 'local') {
    const schemaUploadLocal = z.object({
      filename: z.string(),
      originalname: z.string(),
      size: z.number(),
    })

    const { filename, originalname, size } = schemaUploadLocal.parse(req.file)
    const { pet_id } = req.cookies

    const fileName = filename.replace(/ /g, '%20')

    const data: any[] = []

    data.push({
      image_url: 'http://localhost:3335/files/' + fileName,
      file_name: originalname,
      key: fileName,
      size,
      pet_id,
    })

    return reply.status(200).send({ data })
  }

  const schemaUploadLocal = z.object({
    location: z.string(),
    size: z.number(),
    originalname: z.string(),
    key: z.string(),
  })

  const schemaCookie = z.object({
    pet_id: z.string(),
  })

  const { location, size, originalname, key } = schemaUploadLocal.parse(
    req.file,
  )

  const { pet_id } = schemaCookie.parse(req.cookies)

  const userCase = makeUploadsUseCase()

  const { image } = await userCase.execute({
    file_name: originalname,
    image_url: location,
    key,
    size,
    pet_id,
  })

  return reply.status(200).send({ image })
}
