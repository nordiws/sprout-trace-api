import { Plant, PlantStatus } from '@prisma/client'
import { PlantWithStrain } from '../repository/plants.repository.types'

export class PlantDTO {
  id: string
  code: string
  strainId: string
  strainName: string
  status: PlantStatus
  plantedDate?: string
  expectedHarvestDate?: string
  height?: number
  health?: string
  location?: string
  
  static fromPlantWithStrain(entity: PlantWithStrain): PlantDTO {
    return {
      id: entity.id,
      code: entity.code,
      strainId: entity.strain.id,
      strainName: entity.strain.name,
      status: entity.status,
      plantedDate: entity.plantedDate?.toISOString(),
      height: entity.height ?? undefined,
      health: entity.health,
      location: entity.location ?? undefined,
      expectedHarvestDate: entity.expectedHarvest.toISOString(),
    }
  }
}
