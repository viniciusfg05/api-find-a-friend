import fastifyMulter from 'fastify-multer'

import { storageType } from './storageType'
import { env } from '@/env'

function fileFilter(request: any, file: any, cb: any) {
  const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif']

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type.'))
  }
}

export const uploadMulter = fastifyMulter({
  // @ts-ignore
  storage:
    env.STORAGE_ENVIRAMENTS === 'local' ? storageType.local : storageType.s3,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})
