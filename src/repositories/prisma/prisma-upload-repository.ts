import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'
import { UploadRepository } from '../upload-repository'

export class PrismaUploadRepository implements UploadRepository {
  async upload(data: Prisma.ImageUncheckedCreateInput) {
    const image = await prisma.image.create({
      data,
    })

    return image
  }
}
