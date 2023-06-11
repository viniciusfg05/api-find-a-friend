import { makeCreatePetsUseCase } from '@/use-case/factories/make-create-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createPetsBodySchema = z.object({
    about: z.string(),
    age: z.string(),
    energyLevel: z.enum(['Low', 'Moderate', 'Medium', 'High', 'VeryHigh']),
    environment: z.enum(['Small', 'Medium', 'big']),
    levelOfIndependence: z.enum([
      'Low',
      'Moderate',
      'Medium',
      'High',
      'VeryHigh',
    ]),
    name: z.string(),
    uf: z.string(),
    city: z.string(),
    organization_id: z.string(),
  })

  const {
    about,
    age,
    energyLevel,
    environment,
    levelOfIndependence,
    name,
    organization_id,
    city,
    uf,
  } = createPetsBodySchema.parse(req.body)

  const userCase = makeCreatePetsUseCase()

  const { pet } = await userCase.execute({
    about,
    age,
    energyLevel,
    environment,
    levelOfIndependence,
    name,
    organization_id,
    city,
    uf,
  })

  return reply
    .setCookie('pet_id', pet.id, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true, // acessado apenas pelo back-end
    })
    .status(201)
    .send({ pet })
}
