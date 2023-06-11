import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FindPetByIdUseCase } from './find-pet-by-id'
import { CreatePetUseCase } from './create'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { RegisterOrganizationsUserCase } from './register'

let petsRepository: InMemoryPetsRepository
let sut: FindPetByIdUseCase

let sutCreatePet: CreatePetUseCase

let organizationsRepository: InMemoryOrganizationsRepository
let sutOrganization: RegisterOrganizationsUserCase

describe('Find pet by id', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sutOrganization = new RegisterOrganizationsUserCase(organizationsRepository)
    sutCreatePet = new CreatePetUseCase(petsRepository, organizationsRepository)
  })

  it('should be possible to view a pet', async () => {
    sut = new FindPetByIdUseCase(petsRepository)

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
      about: 'Description about pets tttttttt',
      age: 'Adulto',
      energyLevel: 'Low',
      environment: 'Small',
      name: 'Koda',
      city: 'Brasilia',
      uf: 'DF',
      levelOfIndependence: 'Low',
      organization_id: organization.id,
    })

    const { pets } = await sut.execute(pet.id)

    if (!pets) {
      throw new Error('pet not found')
    }

    expect(pets.id).toEqual(expect.any(String))
  })
})
