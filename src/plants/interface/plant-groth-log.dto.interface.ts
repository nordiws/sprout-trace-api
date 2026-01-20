import { Prisma } from "prisma/generated/client";

export interface IPlantGrowthLogDTO {
  toPrismaCreateInput(
    plantId: string
  ): Prisma.PlantGrowthLogCreateInput;
}
