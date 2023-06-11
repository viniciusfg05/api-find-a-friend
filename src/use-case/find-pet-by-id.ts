import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FindPetByIdUseCaseResponse {
  pets: Pet | null
}

export class FindPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(id: string): Promise<FindPetByIdUseCaseResponse> {
    const pets = await this.petsRepository.findById(id)

    return { pets }
  }
}
