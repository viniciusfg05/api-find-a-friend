import { FastifyInstance } from 'fastify'
import { create } from './create'
import { upload } from './upload'
import { uploadMulter } from '@/lib/multer'
import { deleteUpload } from './deleteUpload'
import { viewImageUrl } from './viewImageUrl'
import { findPetByFeatures } from './find-pet-by-features'
import { findPetById } from './find-pet-by-id'
import { findPetByCity } from './find-pet-by-city'
import { verifyJWT } from '@/http/middlewares/veryfy-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pets', create)

  app.post('/upload', { preHandler: uploadMulter.single('file') }, upload)

  app.delete('/files/:filename', deleteUpload)

  app.get('/files/:filename', viewImageUrl)

  app.get('/features', findPetByFeatures)

  app.get('/pet/:id', findPetById)

  app.get('/pets/:uf/:city', findPetByCity)
}
