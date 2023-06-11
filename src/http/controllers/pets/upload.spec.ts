import { afterAll, beforeAll, expect, it, describe } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import path from 'path'
import { env } from '@/env'
import AWS from 'aws-sdk'
import { createAndAuthenticate } from '@/utils/test/create-and-authenticate-user'

describe('Upload Image Pet (e2e)', () => {
  const s3 = new AWS.S3({})

  function deleteImageAws(imageKey: string) {
    return s3
      .deleteObject({
        Bucket: env.BUCKET_NAME,
        Key: imageKey,
      })
      .promise()
  }

  beforeAll(async () => {
    await app.ready() // saber se o server inicializou
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to upload image', async () => {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'tmp',
      'img.jpeg',
    )

    const { token, id } = await createAndAuthenticate(app, true)

    const createResponse = await request(app.server)
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

    const cookies = createResponse.get('Set-Cookie')

    const response = await request(app.server)
      .post('/upload')
      .set('Authorization', `Bearer ${token}`)
      .set('Cookie', cookies)
      .attach('file', filePath)
      .expect(200)

    await deleteImageAws(response.body.image.key)

    expect(response.statusCode).toEqual(200)
  })
})
