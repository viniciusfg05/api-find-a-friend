import { afterAll, beforeAll, expect, it, describe } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // saber se o server inicializou
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      address: 'QS 12 CJ 9B',
      cep: '71219585',
      email: 'vinicius.fg05@gmail.com',
      uf: 'DF',
      city: 'Brasilia',
      name: 'Vinícius',
      password: '150517Vl',
      phone: '61996804406',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'vinicius.fg05@gmail.com',
      password: '150517Vl',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
