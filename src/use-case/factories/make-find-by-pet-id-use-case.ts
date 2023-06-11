import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FindPetByIdUseCase } from '../find-pet-by-id'

export function makeFindPetByIdUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const userCase = new FindPetByIdUseCase(petsRepository)

  return userCase
}
