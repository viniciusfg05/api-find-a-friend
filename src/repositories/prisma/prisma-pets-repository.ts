import { Prisma, Pet } from '@prisma/client'
import { FindByCityProps, FindByFeaturesProps, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findByCity({ uf, city }: FindByCityProps): Promise<{ pets: Pet[] | null }> {
    const pets = await prisma.pet.findMany({
      where: {
        uf,
        city
      }
    })
    

    return { pets }
  }
  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id
      },
      include: {
        Organization: {
          select: {
            address: true,
            cep: true,
            city: true,
            phone: true,
          }
        }
      }
    })

    return pet
  }

  async findByFeatures({ age, energyLevel, environment, levelOfIndependence, }: FindByFeaturesProps): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age,
        energyLevel,
        levelOfIndependence,
        environment
      }
    })

    return pets
  }

  async upload(data: Prisma.ImageUncheckedCreateInput) {
    const image = await prisma.image.create({
      data,
    })

    return image
  }

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const pets = await prisma.pet.create({
      data,
    })

    return pets
  }


}
