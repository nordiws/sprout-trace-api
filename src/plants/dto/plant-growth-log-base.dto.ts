import { Prisma } from "prisma/generated/client";
import { PlantGrowthLogType, PlantPhase } from "prisma/generated/enums";
import { IPlantGrowthLogDTO } from "../interface/plant-groth-log.dto.interface";

export abstract class PlantGrowthLogBaseDTO implements IPlantGrowthLogDTO {

    date!: Date | string;
    type!: PlantGrowthLogType;
    phase!: PlantPhase;
    notes?: string;

    abstract toPrismaCreateInput(
        plantId: string
    ): Prisma.PlantGrowthLogCreateInput;

    protected baseCreateInput(
        plantId: string
    ): Prisma.PlantGrowthLogCreateInput {
        return {
            date: this.date,
            type: this.type,
            phase: this.phase,
            notes: this.notes ?? null,
            plant: {
                connect: { id: plantId },
            },
        };
    }
}