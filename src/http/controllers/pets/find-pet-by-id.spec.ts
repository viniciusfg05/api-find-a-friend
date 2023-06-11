import { afterAll, beforeAll, expect, it, describe, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticate } from '@/utils/test/create-and-authenticate-user'

describe('Find Pet by features (e2e)', () => {
  beforeEach(async () => {})

  beforeAll(async () => {
    await app.ready() // saber se o server inicializou
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to find pet by features', async () => {
    const { token, id } = await createAndAuthenticate(app, true)

    const responseCreate = await request(app.server)
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

    const responseFindId = await request(app.server)
      .get(`/pet/${responseCreate.body.pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(responseFindId.body.pets).toEqual(
      expect.objectContaining({
        name: 'Koda Marçal',
        about: 'Sobre o pet',
        age: 'Adulto',
        uf: 'DF',
        city: 'Brasilia',
        energyLevel: 'Low',
        levelOfIndependence: 'Low',
        environment: 'Small',
      }),
    )
  })
})
