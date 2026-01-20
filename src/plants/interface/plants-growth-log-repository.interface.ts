import { Prisma } from "prisma/generated/client";

export interface IPlantsGrowthLogRepository {
    addGrowthLog(data: Prisma.PlantGrowthLogCreateInput): Promise<any>;
}