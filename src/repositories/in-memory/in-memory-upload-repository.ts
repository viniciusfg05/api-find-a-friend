import { Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { UploadRepository } from '../upload-repository'

export class InMemoryUploadRepository implements UploadRepository {
  public items: any[] = []

  async upload(data: Prisma.ImageUncheckedCreateInput) {
    const upload = {
      id: randomUUID(),
      file_name: data.file_name,
      image_url: data.image_url,
      key: data.key,
      size: data.size,
      pet_id: data.pet_id ?? '',
    }

    this.items.push(upload)

    return upload
  }
}
