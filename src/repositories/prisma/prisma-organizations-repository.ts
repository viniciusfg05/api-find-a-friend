
import { Prisma, Pet, Organization } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { OrganizationsRepository } from '../organizations-repository'
import { prisma } from '../../lib/prisma'

interface FindByCityProps {
  city: string
  uf: string
}



export class PrismaOrganizationRepository implements OrganizationsRepository {
  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        email
      }
    })

    return organization
  }

  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return organization
  }

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }

  async findByCity({ city, uf }: FindByCityProps): Promise<any> {
    const pets = await prisma.organization.findFirstOrThrow({
      where: {
        uf,
        city
      },
      select: {
        pets: true,
      }
    })

    return pets
  }
}
