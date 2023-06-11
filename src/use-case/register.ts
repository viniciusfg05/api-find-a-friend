import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExists } from './errors/organization-already-exists'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  cep: string
  uf: string
  city: string
  address: string
  phone: string
}

interface RegisterOrganizationsUseCaseResponse {
  organization: Organization
}

export class RegisterOrganizationsUserCase {
  constructor(private organizationRepository: OrganizationsRepository) {}

  async execute({
    email,
    name,
    password,
    cep,
    uf,
    city,
    address,
    phone,
  }: RegisterUseCaseRequest): Promise<RegisterOrganizationsUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const petWithSameEmail = await this.organizationRepository.findByEmail(
      email,
    )

    if (petWithSameEmail) {
      throw new OrganizationAlreadyExists()
    }

    const organization = await this.organizationRepository.create({
      address,
      cep,
      email,
      city,
      uf,
      name,
      password_hash,
      phone,
    })

    return { organization }
  }
}
