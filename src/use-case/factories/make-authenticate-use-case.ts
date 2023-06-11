import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository()
  const userCase = new AuthenticateUseCase(organizationsRepository)

  return userCase
}
