import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FindPetByCityUseCaseRequest {
  city: string
  uf: string
}

interface FindPetByCityUseCaseResponse {
  pets: Pet[] | null
}

export class FindPetByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    uf,
    city,
  }: FindPetByCityUseCaseRequest): Promise<FindPetByCityUseCaseResponse> {
    const pets = await this.petsRepository.findByCity({ uf, city })

    // if (!pets) {
    //   throw new Error('Pets not found')
    // }

    return pets
  }
}
