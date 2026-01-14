import { PlantStatus } from "prisma/generated/client"
import { PlantWithStrain } from "../plant.repository.types"

export class PlantDTO {
  
  id: string
  code: string
  strain: string
  status: PlantStatus
  createdAt?: string
  height?: number
  health?: string
  location?: string
  expectedHarvestDate?: string


  static fromEntity(entity: PlantWithStrain): PlantDTO {
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
