import { Prisma, Pet } from '@prisma/client'

export interface FindByFeaturesProps {
  age?: string
  energyLevel?: 'Low' | 'Moderate' | 'Medium' | 'High' | 'VeryHigh'
  levelOfIndependence?: 'Low' | 'Moderate' | 'Medium' | 'High' | 'VeryHigh'
  environment?: 'Small' | 'Medium' | 'big'
  size?: 'Tiny' | 'Small' | 'Medium' | 'Big' | 'VeryLarge'
}

export interface FindByCityProps {
  uf: string
  city: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByFeatures({
    age,
    energyLevel,
    environment,
    levelOfIndependence,
  }: FindByFeaturesProps): Promise<Pet[] | null>
  findById(id: string): Promise<Pet | null>
  findByCity({ uf, city }: FindByCityProps): Promise<{ pets: Pet[] | null }>
}
