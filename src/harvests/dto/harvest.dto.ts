import { HarvestStatus, HarvestType } from '@prisma/client'
import { HarvestWithPlantsStrainsTimeline } from '../repository/harvests.repository.types'
import { PlantDTO } from 'src/plants/dto/plant.dto'

export class HarvestDTO {
  id: string
  code: string
  name: string
  startDate: string
  endDate?: string
  status: HarvestStatus
  harvestType: HarvestType
  notes?: string
  totalYield?: string
  plants: PlantDTO[]

  static fromEntity(this: void, entity: HarvestWithPlantsStrainsTimeline): HarvestDTO {
    return {
      id: entity.id,
      code: entity.code,
      name: entity.name,
      startDate: entity.startDate.toISOString(),

      status: entity.status,
      harvestType: entity.harvestType,
      notes: entity.notes ?? undefined,
      totalYield: entity.totalYield ?? undefined,

      plants: entity.plants.map((plant) => PlantDTO.fromPlantWithStrain(plant)),
    }
  }
}
