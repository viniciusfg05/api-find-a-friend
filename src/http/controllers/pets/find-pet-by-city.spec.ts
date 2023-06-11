import { afterAll, beforeAll, expect, it, describe, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticate } from '@/utils/test/create-and-authenticate-user'

describe('Find Pet by city (e2e)', () => {
  beforeEach(async () => {})

  beforeAll(async () => {
    await app.ready() // saber se o server inicializou
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to find pet by features', async () => {
    const { token, id } = await createAndAuthenticate(app, true)

    await request(app.server)
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

    const responseFeatures = await request(app.server)
      .get('/pets/:uf/:city')
      .set('Authorization', `Bearer ${token}`)
      .query({
        city: 'Brasilia',
        uf: 'DF',
      })
      .send()

    const { pets } = responseFeatures.body

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        city: 'Brasilia',
        uf: 'DF',
      }),
    ])
  })
})
