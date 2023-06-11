import { makeFindPetByIdUseCase } from '@/use-case/factories/make-find-by-pet-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findPetById(req: FastifyRequest, reply: FastifyReply) {
  const findPetByFeaturesBodySchema = z.object({
    id: z.string(),
  })

  const { id } = findPetByFeaturesBodySchema.parse(req.params)

  const userCase = makeFindPetByIdUseCase()

  const { pets } = await userCase.execute(id)

  return reply.status(200).send({ pets })
}
