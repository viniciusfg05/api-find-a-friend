import { it, describe, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { randomUUID } from 'crypto'
import { FindPetByFeaturesUseCase } from './find-pet-by-features'
let petsRepository: InMemoryPetsRepository
let sut: FindPetByFeaturesUseCase

describe('Find pet by features', () => {
  it('should be able possible to find a pet by the characteristics', async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FindPetByFeaturesUseCase(petsRepository)

    petsRepository.items.push({
      id: randomUUID(),
      about: 'Description about pets',
      age: 'Adulto',
      energyLevel: 'Low',
      environment: 'Small',
      name: 'Koda',
      city: 'Brasilia',
      uf: 'DF',
      levelOfIndependence: 'Low',
      organization_id: 'c43954a3-750f-4ac4-bbe8-089dc258be60',
    })

    const { pets } = await sut.execute({
      age: 'Adulto',
      energyLevel: 'Low',
    })

    expect(pets).toEqual(
      expect.objectContaining({
        age: 'Adulto',
        energyLevel: 'Low',
      }),
    )
  })
})
