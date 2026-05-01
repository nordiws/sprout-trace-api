import { Strain, Plant, Seed, Harvest, PlantGrowthLog } from '@prisma/client'

export type PlantWithStrain = Plant & {
  strain: Strain
}

export type PlantWithStrainSeedHarvestLogs = Plant & {
  strain: Strain
  seed: Seed
  harvest: Harvest
  growthLogs: Array<PlantGrowthLog>
}
