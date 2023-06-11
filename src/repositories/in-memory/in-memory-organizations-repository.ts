import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async findByCity({ city, uf }: any) {
    return null
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async create(
    data: Prisma.OrganizationCreateInput,
  ): Promise<Organization | any> {
    const organization = {
      id: data.id ?? randomUUID(),
      address: data.address,
      cep: data.cep,
      email: data.email,
      name: data.name,
      uf: data.uf,
      city: data.city,
      password_hash: data.password_hash,
      phone: data.phone,
      role: data.role ?? 'MEMBER',
    }

    this.items.push(organization)

    return organization
  }

  async findById(id: string) {
    const organization = this.items.find((user) => user.id === id)

    if (!organization) {
      return null
    }

    return organization
  }
}
