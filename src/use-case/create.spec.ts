import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { RegisterOrganizationsUserCase } from './register'
import { randomUUID } from 'node:crypto'

let petsRepository: InMemoryPetsRepository
let sutCreatePet: CreatePetUseCase

let organizationsRepository: InMemoryOrganizationsRepository
let sutOrganization: RegisterOrganizationsUserCase

describe('Create Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sutCreatePet = new CreatePetUseCase(petsRepository, organizationsRepository)

    sutOrganization = new RegisterOrganizationsUserCase(organizationsRepository)
  })

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

    const { pet } = await sutCreatePet.execute({
      id: randomUUID(),
      about: 'Description about pets',
      age: 'Adulto',
      energyLevel: 'Low',
      environment: 'Small',
      name: 'Koda',
      city: 'Brasilia',
      uf: 'UF',
      levelOfIndependence: 'Low',
      organization_id: organization.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.organization_id).toEqual(expect.any(String))
    expect(pet).toEqual(
      expect.objectContaining({
        about: 'Description about pets',
        age: 'Adulto',
        energyLevel: 'Low',
        environment: 'Small',
        name: 'Koda',
        levelOfIndependence: 'Low',
        organization_id: organization.id,
      }),
    )
  })
})
