import {
  Harvest,
  HarvestTimeline,
  QualityGrade,
} from '@prisma/client'
import { HarvestDTO } from './harvest.dto'
import { HarvestWithPlantsTimeline, HarvestWithPlantsStrainsTimeline } from '../repository/harvests.repository.types'
import { PlantDTO } from 'src/plants/dto/plant.dto'

export class HarvestDetailsDTO extends HarvestDTO {
  harvestMethod?: string
  dryingMethod?: string
  dryingLocation?: string
  curingMethod?: string
  qualityGrade?: QualityGrade
  dryingTemperature?: string
  dryingHumidity?: string
  moistureContent?: string
  trimLoss?: string
  createdAt: string
  updatedAt: string
  timeline: HarvestTimeline[]

  static fromHarvestWithPlantsStrainsTimeline(entity: HarvestWithPlantsStrainsTimeline): HarvestDetailsDTO {
    return {
      id: entity.id,
      code: entity.code,
      name: entity.name,
      startDate: entity.startDate.toISOString(),
      endDate: entity.endDate?.toISOString(),
      status: entity.status,
      harvestType: entity.harvestType,
      notes: entity.notes ?? undefined,
      totalYield: entity.totalYield ?? undefined,
      plants: entity.plants.map((plant) => PlantDTO.fromPlantWithStrain(plant)),

      harvestMethod: entity.harvestMethod ?? undefined,
      dryingMethod: entity.dryingMethod ?? undefined,
      dryingLocation: entity.dryingLocation ?? undefined,
      curingMethod: entity.curingMethod ?? undefined,
      qualityGrade: entity.qualityGrade ?? undefined,

      dryingTemperature: entity.dryingTemperature ?? undefined,
      dryingHumidity: entity.dryingHumidity ?? undefined,
      moistureContent: entity.moistureContent ?? undefined,
      trimLoss: entity.trimLoss ?? undefined,

      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
      timeline: entity.timeline
    }
  }

}
