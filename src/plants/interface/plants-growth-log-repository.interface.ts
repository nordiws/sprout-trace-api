import { Prisma } from '@prisma/client'

export interface IPlantsGrowthLogRepository {
  addGrowthLog(data: Prisma.PlantGrowthLogCreateInput): Promise<any>
}
