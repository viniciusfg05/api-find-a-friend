import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticate(
  app: FastifyInstance,
  isAdmin = false,
) {
  const { id } = await prisma.organization.create({
    data: {
      address: 'QS 12 CJ 9B',
      cep: '71219585',
      email: 'vinicius.fg09@gmail.com',
      uf: 'DF',
      city: 'Brasilia',
      name: 'Vinícius',
      phone: '6199680440',
      password_hash: await hash('150517Vl', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'vinicius.fg09@gmail.com',
    password: '150517Vl',
  })

  const { token } = authResponse.body

  return {
    token,
    id,
  }
}
