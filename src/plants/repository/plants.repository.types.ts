import { Strain, Plant } from "prisma/generated/client"

export type PlantWithStrain = Plant & {
  strain: Strain;
}

export type PlantWithStrainAndLogs = Plant & {
  strain: Strain;
  growthLogs: Array<import("prisma/generated/client").PlantGrowthLog>;
}