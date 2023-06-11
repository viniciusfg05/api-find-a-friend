import { UploadRepository } from '@/repositories/upload-repository'
import { Image, Prisma } from '@prisma/client'
import { NotPetIdProvidedError } from './errors/not-pet-id-provided'

interface UploadPetUseCaseResponse {
  image: Image
}

export class UploadUseCase {
  constructor(private uploadRepository: UploadRepository) {}

  async execute({
    file_name,
    image_url,
    key,
    size,
    pet_id,
  }: Prisma.ImageUncheckedCreateInput): Promise<UploadPetUseCaseResponse> {
    if (!pet_id) {
      throw new NotPetIdProvidedError()
    }

    const image = await this.uploadRepository.upload({
      file_name,
      image_url,
      key,
      size,
      pet_id,
    })

    return { image }
  }
}
