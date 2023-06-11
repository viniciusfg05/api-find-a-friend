import { FastifyReply, FastifyRequest } from 'fastify'
import { Multer } from 'multer'
import fs from 'fs'
import path from 'path'
import { z } from 'zod'

interface FastifyMulterResponse extends FastifyRequest {
  file?: Multer
}

export async function viewImageUrl(
  req: FastifyMulterResponse,
  reply: FastifyReply,
) {
  const schemaViewImageUrl = z.object({
    filename: z.string(),
  })

  const { filename } = schemaViewImageUrl.parse(req.params)

  const filePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'tmp/uploads',
    filename,
  )

  try {
    const checkIfAFileWithThatPathExists = await fs.promises.stat(filePath)

    if (checkIfAFileWithThatPathExists.isFile()) {
      return reply.type('image').send(fs.createReadStream(filePath))
    }

    return reply.code(404).send('Arquivo não encontrado')
  } catch (error) {
    reply.code(404).send('Arquivo não encontrado')
  }
}
