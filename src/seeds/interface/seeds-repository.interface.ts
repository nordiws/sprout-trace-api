import { Seed } from "prisma/generated/client";
import { SeedFiltersDTO } from "../dto/seed-filter.dto";
import { SeedCreateInput, SeedUpdateInput } from "prisma/generated/models";

export interface ISeedsRepository {
    findAll(userId: string, filters: SeedFiltersDTO): Promise<{data: Seed[]; total: number}>
    findOne(userId: string, id: string): Promise<Seed | null>
    create(data: SeedCreateInput): Promise<Seed>
    update(userId: string, id: string, data: SeedUpdateInput): Promise<Seed>
    softDelete(userId: string, id: string): Promise<Seed>
}