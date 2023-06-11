import { Prisma, Image } from '@prisma/client'

export interface UploadProps {
  location: string
  size: number
  originalname: string
  key: string
}

export interface UploadRepository {
  upload(data: Prisma.ImageUncheckedCreateInput): Promise<Image>
}
