import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create'
import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organizations-repository'

export function makeCreatePetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const organizationsRepository = new PrismaOrganizationRepository()
  const userCase = new CreatePetUseCase(petsRepository, organizationsRepository)

  return userCase
}
