import { HarvestStatus, HarvestType } from "prisma/generated/enums"
import { HarvestWithPlants } from "../harvest.repository.types"

export class HarvestDTO {
  
  id: string
  name: string
  startDate: string
  status: HarvestStatus
  harvestType: HarvestType
  notes?: string
  totalYield?: string
  plants: string[]

  static fromEntity(entity: HarvestWithPlants): HarvestDTO {
    return {
      id: entity.id,
      name: entity.name,
      startDate: entity.startDate.toISOString(),

      status: entity.status,
      harvestType: entity.harvestType,
      notes: entity.notes ?? undefined,
      totalYield: entity.totalYield ?? undefined,

      plants: entity.plants.map((plant) => plant.id)
    }
  }

}
