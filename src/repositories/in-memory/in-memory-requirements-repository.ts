// import { Prisma, Requirement } from '@prisma/client'
import { randomUUID } from 'crypto'
import { RequirementsRepository } from '../requirements-repository'

interface RequirementsResponse {
  pet_id: string
  requirement: string
}

export class InMemoryRequirementsRepository implements RequirementsRepository {
  public items: any[] = []

  async create({ pet_id, requirement }: RequirementsResponse) {
    const requirements = {
      id: randomUUID() ?? '',
      pet_id,
      requirement,
    }

    this.items.push(requirements)

    return requirements
  }
}
