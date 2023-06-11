import fastify from 'fastify'
import fastifyMulter from 'fastify-multer'
import fastifyCookie from '@fastify/cookie'
import { petsRoutes } from './http/controllers/pets/routes'
import { orgsRoutes } from './http/controllers/org/routes'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)
app.register(fastifyMulter.contentParser)

app.register(petsRoutes)
app.register(orgsRoutes)
