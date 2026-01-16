import { Plant } from "prisma/generated/client";
import { PlantFiltersDTO } from "../dto/plant-filter.dto";

export interface IPlantsRepository {
    findAll(userId: string, filters: PlantFiltersDTO): Promise<{ data: Plant[]; total: number }> 
    findOne(id: string): Promise<Plant>
    create(data: Plant): Promise<Plant>
    update(id: string, data: Plant): Promise<Plant>
    softDelete(id: string): Promise<Plant>
}