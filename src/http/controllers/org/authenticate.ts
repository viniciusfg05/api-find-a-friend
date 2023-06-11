import { makeAuthenticateUseCase } from '@/use-case/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  const authenticateUseCase = makeAuthenticateUseCase()

  const { organization } = await authenticateUseCase.execute({
    email,
    password,
  })

  const token = await reply.jwtSign(
    {
      role: organization.role,
    },
    {
      sign: {
        sub: organization.id,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {
      role: organization.role,
    },
    {
      sign: {
        sub: organization.id,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true, // acessado apenas pelo back-end
    })
    .status(200)
    .send({ token })
}
