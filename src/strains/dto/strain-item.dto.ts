import { StrainType } from '@prisma/client'
import { StrainWithPlantsHarvests } from '../repository/strains.repository.types'

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
  genetics?: string
  code?: string

  static fromEntity(this: void, entity: StrainWithPlantsHarvests): StrainItemDTO {
    const dto = new StrainItemDTO()
    dto.id = entity.id
    dto.name = entity.name
    dto.type = entity.type
    dto.description = entity.description
    dto.thc = entity.thc
    dto.cbd = entity.cbd
    dto.floweringTime = entity.floweringTime
    dto.activePlants = entity.plants?.filter((plant) => plant.active).length || 0
    dto.dateAdded = entity.dateAdded.toISOString()
    dto.genetics = entity.genetics
    dto.code = entity.code
    return dto
  }
}
