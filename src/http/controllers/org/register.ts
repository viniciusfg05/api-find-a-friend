import { makeRegisterOrganizationsUseCase } from '@/use-case/factories/make-register-organizations-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    cep: z.string(),
    uf: z.string(),
    city: z.string(),
    address: z.string(),
    phone: z.string(),
  })

  const { email, name, password, cep, uf, city, address, phone } =
    registerBodySchema.parse(req.body)

  const useCase = makeRegisterOrganizationsUseCase()

  const {
    organization: { id },
  } = await useCase.execute({
    email,
    name,
    password,
    cep,
    uf,
    city,
    address,
    phone,
  })

  return reply.status(201).send({ id })
}
