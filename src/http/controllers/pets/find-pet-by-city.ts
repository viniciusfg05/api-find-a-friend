import { makeFindPetByCityUseCase } from '@/use-case/factories/make-find-by-pet-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findPetByCity(req: FastifyRequest, reply: FastifyReply) {
  const findPetByCityBodySchema = z.object({
    city: z.string(),
    uf: z.string(),
  })

  const { city, uf } = findPetByCityBodySchema.parse(req.query)

  const userCase = makeFindPetByCityUseCase()

  const { pets } = await userCase.execute({ city, uf })

  return reply.status(200).send({ pets })
}
