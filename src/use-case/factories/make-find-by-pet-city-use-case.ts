import { FindPetByCityUseCase } from '../find-pet-by-city'
import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organizations-repository'

export function makeFindPetByCityUseCase() {
  const organizationRepository = new PrismaOrganizationRepository()
  const userCase = new FindPetByCityUseCase(organizationRepository)

  return userCase
}
