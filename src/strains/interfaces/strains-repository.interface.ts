import { Prisma, Strain } from "prisma/generated/client";
import { StrainFiltersDTO } from "../dto/strain-filter.dto";


export interface IStrainsRepository {
    findAll(userId: string, filters: StrainFiltersDTO): Promise<{data: Strain[], total: number}>;
    findOne(userId: string, id: string): Promise<Strain | null>;
    create(data: Prisma.StrainCreateInput): Promise<Strain>;
    update(id: string, data: Strain): Promise<Strain>;
    softDelete(userId: string, id: string): Promise<Strain>;
}