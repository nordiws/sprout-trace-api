import { Injectable } from "@nestjs/common";
import { Plant } from "prisma/generated/client";
import { IPlantsRepository } from "../interface/plants-repository.interface";
import { PlantFiltersDTO } from "../dto/plant-filter.dto";
import { PrismaService } from "src/prisma/prisma.service"
import { PlantWithStrainAndLogs } from "./plants.repository.types";

@Injectable()
export class PlantsRepository implements IPlantsRepository {

    constructor(private readonly prisma: PrismaService) {}
    
    findAll(userId: string, filters: PlantFiltersDTO): Promise<{ data: Plant[]; total: number; }> {
        throw new Error("Method not implemented.");
    }
    findOne(id: string): Promise<Plant> {
        throw new Error("Method not implemented.");
    }
    create(data: Plant): Promise<Plant> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: Plant): Promise<Plant> {
        throw new Error("Method not implemented.");
    }
    softDelete(id: string): Promise<Plant> {
        throw new Error("Method not implemented.");
    }

    findByIdWithLastLog(userId: string, id: string): Promise<PlantWithStrainAndLogs | null> {
        return this.prisma.plant.findUnique({
            where: { id, userId, active: true },
            include: {
                strain: true,
                growthLogs: {
                    orderBy: { date: 'desc' },
                    take: 1
                }
            }
        });
    }

}