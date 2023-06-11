import { Prisma, Organization, Pet } from '@prisma/client'

interface FindByCityProps {
  city: string
  uf: string
}

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findByCity({ city, uf }: FindByCityProps): Promise<Pet[] | null>
  findById(id: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
}
