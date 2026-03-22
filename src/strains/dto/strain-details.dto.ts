import { StrainWithPlantsHarvests } from '../repository/strains.repository.types'
import { StrainDTO } from './strain.dto'

export class StrainDetailsDTO extends StrainDTO {
  code?: string
  genetics?: string
  activePlants: number
  totalHarvests?: number
  origin?: string
  breeder?: string
  difficulty?: string
  yield?: string
  preferredEnv?: string
  resistance?: string
  growthPattern?: string
  effects?: string
  terpenes?: string
  medicalUses?: string

  static fromEntity(entity: StrainWithPlantsHarvests): StrainDetailsDTO {
    const dto = new StrainDetailsDTO()
    dto.id = entity.id
    dto.name = entity.name
    dto.type = entity.type || undefined
    dto.description = entity.description
    dto.thc = entity.thc || undefined
    dto.cbd = entity.cbd || undefined
    dto.floweringTime = entity.floweringTime || undefined
    dto.dateAdded = entity.createdAt.toISOString()
    dto.activePlants = entity.plants?.filter((plant) => plant.active).length || 0
    dto.totalHarvests = entity.harvests?.length || 0
    dto.code = entity.code || undefined
    dto.genetics = entity.genetics || undefined
    dto.effects = entity.effects || undefined
    dto.terpenes = entity.terpenes || undefined
    dto.medicalUses = entity.medicalUses || undefined
    dto.origin = entity.origin || undefined
    dto.breeder = entity.breeder || undefined
    dto.difficulty = entity.difficulty || undefined
    dto.yield = entity.yield || undefined
    dto.preferredEnv = entity.preferredEnv || undefined
    dto.resistance = entity.resistance || undefined
    dto.growthPattern = entity.growthPattern || undefined
    return dto
  }
}
