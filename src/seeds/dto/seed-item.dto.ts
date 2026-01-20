import { Seed } from "prisma/generated/client";
import { SeedWithStrain } from "../repository/seeds.repository.types";

export class SeedItemDTO {
    id: string;
    name: string;
    strain: string;
    country: string;
    harvestYear: string;
    daysTillHarvest: string;
    germinationRate: string | null;
    inscriptionCode: string;
    flavorProfile: string | null;
    createdAt: Date;

    static fromEntity(entity: SeedWithStrain): SeedItemDTO {
        return {
            id: entity.id,
            name: entity.name,
            strain: entity.strain.name,
            country: entity.country,
            harvestYear: entity.harvestYear,
            daysTillHarvest: entity.daysTillHarvest,
            germinationRate: entity.germinationRate,
            inscriptionCode: entity.inscriptionCode,
            flavorProfile: entity.flavorProfile,
            createdAt: entity.createdAt
        }
    }
}