import { PrismaService } from "src/prisma/prisma.service";
import { IPlantsGrowthLogRepository } from "../interface/plants-growth-log-repository.interface";
import { PlantGrowthLogCreateInput } from "prisma/generated/models";
import { PlantGrowthLog } from "prisma/generated/client";

export class PlantGrowthLogRepository implements IPlantsGrowthLogRepository {
    
    constructor(private readonly prisma: PrismaService) { }

    addGrowthLog(data: PlantGrowthLogCreateInput): Promise<PlantGrowthLog> {
        return this.prisma.plantGrowthLog.create({data});
    }

}