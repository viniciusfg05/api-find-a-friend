import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FindPetByFeaturesUseCase } from '../find-pet-by-features'

export function makeFindPetByFeaturesUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const userCase = new FindPetByFeaturesUseCase(petsRepository)

  return userCase
}
