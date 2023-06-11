import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, Prisma } from '@prisma/client'
import { OrganizationIdRequired } from './errors/organization_id_required'
import { OrganizationsRepository } from '@/repositories/organizations-repository'

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    about,
    age,
    energyLevel,
    environment,
    levelOfIndependence,
    name,
    organization_id,
  }: Prisma.PetUncheckedCreateInput): Promise<CreatePetUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(
      organization_id,
    )

    if (!organization) {
      throw new OrganizationIdRequired()
    }

    const pet = await this.petsRepository.create({
      about,
      age,
      energyLevel,
      environment,
      levelOfIndependence,
      name,
      city: organization.city,
      uf: organization.uf,
      organization_id: organization.id,
    })

    return { pet }
  }
}
