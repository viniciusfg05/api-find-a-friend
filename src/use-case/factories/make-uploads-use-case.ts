import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { UploadUseCase } from '../upload'

export function makeUploadsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const userCase = new UploadUseCase(petsRepository)

  return userCase
}
