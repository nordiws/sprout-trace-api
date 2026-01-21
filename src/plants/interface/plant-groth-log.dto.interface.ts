import { Prisma } from '@prisma/client'

export interface IPlantGrowthLogDTO {
  toPrismaCreateInput(plantId: string): Prisma.PlantGrowthLogCreateInput
}
