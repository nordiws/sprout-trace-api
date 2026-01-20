import { Plant } from "prisma/generated/client";
import { PlantFiltersDTO } from "../dto/plant-filter.dto";
import { PlantWithStrainAndLogs } from "../repository/plants.repository.types";
import { PlantCreateInput, PlantUpdateInput } from "prisma/generated/models";

export interface IPlantsRepository {
    findAll(userId: string, filters: PlantFiltersDTO): Promise<{ data: Plant[]; total: number }> 
    findOne(userId: string, id: string): Promise<Plant | null>
    create(data: PlantCreateInput): Promise<Plant>
    update(userId: string, id: string, data: PlantUpdateInput): Promise<Plant>
    softDelete(userId: string, id: string): Promise<Plant>
    findByIdWithLastLog(userId: string, id: string): Promise<PlantWithStrainAndLogs | null>
}