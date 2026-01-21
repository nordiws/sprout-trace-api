import { Harvest, Plant } from '@prisma/client'

export type HarvestWithPlants = Harvest & {
  plants: Plant[]
}
