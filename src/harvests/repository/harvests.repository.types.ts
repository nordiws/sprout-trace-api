import { Harvest, HarvestTimeline, Plant } from '@prisma/client'

export type HarvestWithPlantsTimeline = Harvest & {
  plants: Plant[]
  timeline: HarvestTimeline[]
}
