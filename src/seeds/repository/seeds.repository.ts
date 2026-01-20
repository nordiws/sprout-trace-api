import { Seed } from "prisma/generated/client";
import { SeedCreateInput, SeedUpdateInput } from "prisma/generated/models";
import { SeedFiltersDTO } from "../dto/seed-filter.dto";
import { ISeedsRepository } from "../interface/seeds-repository.interface";

export class SeedsRepository implements ISeedsRepository{
    findAll(userId: string, filters: SeedFiltersDTO): Promise<{ data: Seed[]; total: number; }> {
        throw new Error("Method not implemented.");
    }
    findOne(userId: string, id: string): Promise<Seed | null> {
        throw new Error("Method not implemented.");
    }
    create(data: SeedCreateInput): Promise<Seed> {
        throw new Error("Method not implemented.");
    }
    update(userId: string, id: string, data: SeedUpdateInput): Promise<Seed> {
        throw new Error("Method not implemented.");
    }
    softDelete(userId: string, id: string): Promise<Seed> {
        throw new Error("Method not implemented.");
    }
}