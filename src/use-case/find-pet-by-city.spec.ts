import { it, describe, expect, beforeEach } from 'vitest'
import { FindPetByCityUseCase } from './find-pet-by-city'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { randomUUID } from 'crypto'
import { CreatePetUseCase } from './create'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { RegisterOrganizationsUserCase } from './register'

let petsRepository: InMemoryPetsRepository
let sut: FindPetByCityUseCase

let sutCreatePet: CreatePetUseCase

let organizationsRepository: InMemoryOrganizationsRepository
let sutOrganization: RegisterOrganizationsUserCase

describe('Find Pets the city Use Case', () => {
  petsRepository = new InMemoryPetsRepository()
  sut = new FindPetByCityUseCase(petsRepository)

  organizationsRepository = new InMemoryOrganizationsRepository()
  sutCreatePet = new CreatePetUseCase(petsRepository, organizationsRepository)

  sutOrganization = new RegisterOrganizationsUserCase(organizationsRepository)
  beforeEach(async () => {})

  it('should be able to raise a new pet', async () => {
    const { organization } = await sutOrganization.execute({
      address: 'QS 12 CJ 9B',
      cep: '71219585',
      email: 'vinicius.fg05@gmail.com',
      uf: 'DF',
      city: 'Brasilia',
      name: 'Vinícius',
      password: '150517Vl',
      phone: '61996804406',
    })

    await sutCreatePet.execute({
      id: randomUUID(),
      about: 'Description about pets',
      age: 'Adulto',
      energyLevel: 'Low',
      environment: 'Small',
      name: 'Koda',
      city: 'Brasilia',
      uf: 'DF',
      levelOfIndependence: 'Low',
      organization_id: organization.id,
    })

    const pets = await sut.execute({
      city: 'Brasilia',
      uf: 'DF',
    })

    expect(pets).toEqual(
      expect.objectContaining({
        about: 'Description about pets',
        age: 'Adulto',
        energyLevel: 'Low',
        environment: 'Small',
        name: 'Koda',
        city: 'Brasilia',
        uf: 'DF',
        levelOfIndependence: 'Low',
      }),
    )
  })
})
