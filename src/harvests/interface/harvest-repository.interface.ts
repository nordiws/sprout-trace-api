import { Harvest } from "prisma/generated/client";
import { HarvestFiltersDTO } from "../dto/harvest-filter.dto";

export interface IHarvestRepository {
    findAll(userId: string, filters: HarvestFiltersDTO): Promise<{ data: Harvest[]; total: number }> 
    findOne(id: string): Promise<Harvest>
    create(data: Harvest): Promise<Harvest>
    update(id: string, data: Harvest): Promise<Harvest>
    softDelete(id: string): Promise<Harvest>
}