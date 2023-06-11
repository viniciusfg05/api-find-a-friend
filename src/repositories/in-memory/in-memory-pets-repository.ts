import { Pet, Prisma } from '@prisma/client'
import {
  FindByCityProps,
  FindByFeaturesProps,
  PetsRepository,
} from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findByCity({ uf, city }: FindByCityProps): Promise<Pet[] | any> {
    const pets = this.items.find((item) => item.city === city && item.uf === uf)

    if (!pets) {
      return null
    }

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findByFeatures({
    age,
    energyLevel,
    environment,
    levelOfIndependence,
  }: FindByFeaturesProps): Promise<Pet[] | any> {
    const pets = this.items.find(
      (item) =>
        item.age === age ||
        item.energyLevel === energyLevel ||
        item.environment === environment ||
        item.levelOfIndependence === levelOfIndependence,
    )

    if (!pets) {
      return null
    }

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      about: data.about ?? '',
      age: data.age,
      energyLevel: data.energyLevel,
      environment: data.environment,
      levelOfIndependence: data.levelOfIndependence,
      name: data.name,
      uf: data.uf,
      city: data.city,
      organization_id: data.organization_id,
    }

    this.items.push(pet)

    return pet
  }
}
