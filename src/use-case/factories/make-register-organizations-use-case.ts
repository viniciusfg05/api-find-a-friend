import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { RegisterOrganizationsUserCase } from '../register'

export function makeRegisterOrganizationsUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository()
  const userCase = new RegisterOrganizationsUserCase(organizationsRepository)

  return userCase
}
