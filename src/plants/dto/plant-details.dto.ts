import { PlantPhase, PlantStatus } from '@prisma/client'
import { PlantWithStrainAndLogs } from '../repository/plants.repository.types'

export class PlantDetailsDTO {
  id: string
  code: string
  strain: string
  status: PlantStatus
  createdAt?: string
  height?: number
  health?: string
  location?: string
  expectedHarvestDate?: string
  plantPhase?: PlantPhase

  static fromEntity(entity: PlantWithStrainAndLogs): PlantDetailsDTO {
    return {
      id: entity.id,
      code: entity.code,
      strain: entity.strain.name,
      status: entity.status,
      createdAt: entity.createdAt.toISOString(),
      height: entity.height ?? undefined,
      health: entity.health ?? undefined,
      location: entity.location ?? undefined,
      expectedHarvestDate: entity.expectedHarvest.toISOString(),
      plantPhase: entity.growthLogs[0]?.phase ?? undefined,
    }
  }
}
