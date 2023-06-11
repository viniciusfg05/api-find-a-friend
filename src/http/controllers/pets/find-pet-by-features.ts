import { makeFindPetByFeaturesUseCase } from '@/use-case/factories/make-find-by-pet-features-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findPetByFeatures(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const findPetByFeaturesBodySchema = z.object({
    age: z.string().optional(),
    energyLevel: z
      .enum(['Low', 'Moderate', 'Medium', 'High', 'VeryHigh'])
      .optional(),
    levelOfIndependence: z
      .enum(['Low', 'Moderate', 'Medium', 'High', 'VeryHigh'])
      .optional(),
    environment: z.enum(['Small', 'Medium', 'big']).optional(),
  })

  const { age, energyLevel, environment, levelOfIndependence } =
    findPetByFeaturesBodySchema.parse(req.query)

  const userCase = makeFindPetByFeaturesUseCase()

  const { pets } = await userCase.execute({
    age,
    energyLevel,
    environment,
    levelOfIndependence,
  })

  return reply.status(200).send({ pets })
}
