import path from 'path'
import crypto from 'crypto'
import { s3 } from './aws'
import multerS3 from 'multer-s3'
import fastifyMulter from 'fastify-multer'

export const storageType = {
  local: fastifyMulter.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err)

        const fileName = `${hash.toString('hex')}-${file.originalname.trim()}`

        cb(null, fileName)
      })
    },
  }),
  s3: multerS3({
    s3,
    bucket: 'find-a-friend-vinicius',
    contentType: multerS3.AUTO_CONTENT_TYPE, // ler o tipo do arquivo para abrir o arquivo em tela ao invés do download
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err)

        const fileName = `${hash.toString('hex')}-${file.originalname}`

        cb(null, fileName)
      })
    },
  }),
}
