import { afterAll, beforeAll, expect, it, describe } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticate } from '@/utils/test/create-and-authenticate-user'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // saber se o server inicializou
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a pet', async () => {
    const { token, id } = await createAndAuthenticate(app, true)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        about: 'Sobre o pet',
        age: 'Adulto',
        energyLevel: 'Low',
        environment: 'Small',
        levelOfIndependence: 'Low',
        name: 'Koda Marçal',
        city: 'Brasilia',
        uf: 'DF',
        organization_id: id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
