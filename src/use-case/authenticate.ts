import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { InvalidCredencialError } from './errors/Invalid-credencial-error'
import { compare } from 'bcryptjs'

interface AuthenticationUseCaseRequest {
  email: string
  password: string
}

interface AuthenticationUseCaseResponse {
  organization: Organization
}

export class AuthenticateUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticationUseCaseRequest): Promise<AuthenticationUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredencialError()
    }

    const doesPasswordMatches = await compare(
      password,
      organization.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredencialError()
    }

    return {
      organization,
    }
  }
}
