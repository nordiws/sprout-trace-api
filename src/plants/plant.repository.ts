import { Injectable } from "@nestjs/common";
import { IPlantRepository } from "./interface/plant-repository.interface";
import { Plant } from "prisma/generated/client";
import { PlantFiltersDTO } from "./dto/plant-filter.dto";

@Injectable()
export class PlantRepository implements IPlantRepository {
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

}