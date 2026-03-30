import { Harvest, HarvestTimeline, Plant } from '@prisma/client'
import { PlantWithStrain } from 'src/plants/repository/plants.repository.types'

export type HarvestWithPlantsTimeline = Harvest & {
  plants: Plant[]
  timeline: HarvestTimeline[]
}

export type HarvestWithPlantsStrainsTimeline = Harvest & {
  plants: PlantWithStrain[]
  timeline: HarvestTimeline[]
}