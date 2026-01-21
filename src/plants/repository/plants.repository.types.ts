import { Strain, Plant } from '@prisma/client'

export type PlantWithStrain = Plant & {
  strain: Strain
}

export type PlantWithStrainAndLogs = Plant & {
  strain: Strain
  growthLogs: Array<import('@prisma/client').PlantGrowthLog>
}
