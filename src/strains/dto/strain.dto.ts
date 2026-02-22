import { Strain, StrainType } from '@prisma/client'

export class StrainDTO {
  id: string
  name: string
  type: StrainType
  description: string
  thc: string
  cbd: string
  floweringTime: string
  dateAdded: string

  static fromEntity(entity: Strain): StrainDTO {
    const dto = new StrainDTO()
    dto.id = entity.id
    dto.name = entity.name
    dto.type = entity.type
    dto.description = entity.description
    dto.thc = entity.thc
    dto.cbd = entity.cbd
    dto.floweringTime = entity.floweringTime
    dto.dateAdded = entity.dateAdded.toISOString()
    return dto
  }
}
