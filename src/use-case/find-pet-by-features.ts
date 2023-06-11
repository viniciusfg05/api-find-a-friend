import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FindPetFeaturesUseCaseResponse {
  pets: Pet[] | null
}

interface FindByFeaturesProps {
  age?: string
  energyLevel?: 'Low' | 'Moderate' | 'Medium' | 'High' | 'VeryHigh'
  levelOfIndependence?: 'Low' | 'Moderate' | 'Medium' | 'High' | 'VeryHigh'
  environment?: 'Small' | 'Medium' | 'big'
}

export class FindPetByFeaturesUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    energyLevel,
    environment,
    levelOfIndependence,
  }: FindByFeaturesProps): Promise<FindPetFeaturesUseCaseResponse> {
    const pets = await this.petsRepository.findByFeatures({
      age,
      energyLevel,
      environment,
      levelOfIndependence,
    })

    return { pets }
  }
}
