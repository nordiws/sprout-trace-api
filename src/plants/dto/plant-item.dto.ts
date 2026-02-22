import { PlantStatus } from '@prisma/client'
import { PlantWithStrain } from '../repository/plants.repository.types'

export class PlantItemDTO {
  id: string
  code: string
  strain: string
  status: PlantStatus
  createdAt?: string
  height?: number
  health?: string
  location?: string
  expectedHarvestDate?: string

  static fromEntity(this: void, entity: PlantWithStrain): PlantItemDTO {
    return {
      id: entity.id,
      code: entity.code,
      strain: entity.strain.name,
      status: entity.status,
      createdAt: entity.createdAt.toISOString(),
      height: entity.height ?? undefined,
      health: entity.health,
      location: entity.location ?? undefined,
      expectedHarvestDate: entity.expectedHarvest.toISOString(),
    }
  }
}
