import { it, describe, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create'
import { InMemoryUploadRepository } from '@/repositories/in-memory/in-memory-upload-repository'
import { UploadUseCase } from './upload'
import { NotPetIdProvidedError } from './errors/not-pet-id-provided'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { RegisterOrganizationsUserCase } from './register'

let petsRepository: InMemoryPetsRepository
let createPetUseCase: CreatePetUseCase

let uploadRepository: InMemoryUploadRepository
let uploadUseCase: UploadUseCase

let organizationsRepository: InMemoryOrganizationsRepository
let sutOrganization: RegisterOrganizationsUserCase

describe('Upload data Image Pets Use Case', () => {
  it('should be possible to register the upload of a pet', async () => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    createPetUseCase = new CreatePetUseCase(
      petsRepository,
      organizationsRepository,
    )

    sutOrganization = new RegisterOrganizationsUserCase(organizationsRepository)

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

    const { pet } = await createPetUseCase.execute({
      about: 'Description about pets',
      age: 'Adulto',
      energyLevel: 'Low',
      environment: 'Small',
      name: 'Koda',
      levelOfIndependence: 'Low',
      city: 'Brasilia',
      uf: 'DF',
      organization_id: organization.id,
    })

    uploadRepository = new InMemoryUploadRepository()
    uploadUseCase = new UploadUseCase(uploadRepository)

    const { image } = await uploadUseCase.execute({
      file_name: 'Tes',
      image_url: 'Test',
      key: 'Test',
      size: 500,
      pet_id: pet.id,
    })

    expect(image.key).toEqual(expect.any(String))
  })

  it('should able to not be possible to upload an image before registering a pet', async () => {
    uploadRepository = new InMemoryUploadRepository()
    uploadUseCase = new UploadUseCase(uploadRepository)

    await expect(() =>
      uploadUseCase.execute({
        file_name: 'Tes',
        image_url: 'Test',
        key: 'Test',
        size: 500,
        pet_id: '',
      }),
    ).rejects.toBeInstanceOf(NotPetIdProvidedError)
  })
})
