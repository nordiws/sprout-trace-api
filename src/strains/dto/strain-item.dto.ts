import { StrainType } from '@prisma/client'
import { StrainWithPlants } from '../repository/strains.repository.types'

export class StrainItemDTO {
  id: string
  name: string
  type: StrainType
  description: string
  thc: string
  cbd: string
  floweringTime: string
  activePlants: number
  dateAdded: string

  static fromEntity(this: void, entity: StrainWithPlants): StrainItemDTO {
    const dto = new StrainItemDTO()
    dto.id = entity.id
    dto.name = entity.name
    dto.type = entity.type
    dto.description = entity.description
    dto.thc = entity.thc
    dto.cbd = entity.cbd
    dto.floweringTime = entity.floweringTime
    dto.activePlants = entity.plants.length
    dto.dateAdded = entity.dateAdded.toISOString()
    return dto
  }
}
