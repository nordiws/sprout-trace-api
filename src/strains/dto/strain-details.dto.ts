import { StrainWithPlants } from '../repository/strains.repository.types'

export class StrainDetailsDTO {
  id: string
  name: string
  type?: string
  description: string
  genetics?: string
  thc?: string
  cbd?: string
  floweringTime?: string
  activePlants: number
  gennetics?: string
  effects?: string
  terpenes?: string
  medicalUses?: string
  origin?: string
  breeder?: string
  difficulty?: string
  yield?: string
  perferredEnv?: string

  static fromEntity(entity: StrainWithPlants): StrainDetailsDTO {
    const dto = new StrainDetailsDTO()
    dto.id = entity.id
    dto.name = entity.name
    dto.type = entity.type || undefined
    dto.description = entity.description
    dto.genetics = entity.genetics || undefined
    dto.thc = entity.thc || undefined
    dto.cbd = entity.cbd || undefined
    dto.floweringTime = entity.floweringTime || undefined
    dto.activePlants = entity.plants.filter((plant) => plant.active).length
    dto.gennetics = entity.gennetics || undefined
    dto.effects = entity.effects || undefined
    dto.terpenes = entity.terpenes || undefined
    dto.medicalUses = entity.medicalUses || undefined
    dto.origin = entity.origin || undefined
    dto.breeder = entity.breeder || undefined
    dto.difficulty = entity.difficulty || undefined
    dto.yield = entity.yield || undefined
    dto.perferredEnv = entity.preferredEnv || undefined

    return dto
  }
}
