import { Plant, PlantStatus } from '@prisma/client'
import { PlantWithStrain, PlantWithStrainSeedHarvestLogs } from '../repository/plants.repository.types'

export class PlantDTO {
  id: string
  code: string
  strainId: string
  strainName: string
  harvestId?: string
  harvestName?: string
  seedId?: string
  seedName?: string
  status: PlantStatus
  plantedDate?: string
  expectedHarvestDate?: string
  height?: number
  health?: string
  location?: string
  imageUrl?: string
  
  static fromPlantWithStrainSeedHarvestLogs(entity: PlantWithStrainSeedHarvestLogs): PlantDTO {
    return {
      id: entity.id,
      code: entity.code,
      strainId: entity.strain.id,
      strainName: entity.strain.name,
      harvestId: entity.harvest?.id,
      harvestName: entity.harvest?.name,
      seedId: entity.seed?.id,
      seedName: entity.seed?.name,
      status: entity.status,
      plantedDate: entity.plantedDate?.toISOString(),
      height: entity.height ?? undefined,
      health: entity.health,
      location: entity.location ?? undefined,
      expectedHarvestDate: entity.expectedHarvest.toISOString(),
      imageUrl: entity.imageUrl ?? undefined,
    }
  }

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
      imageUrl: entity.imageUrl ?? undefined,
    }
  }
}
