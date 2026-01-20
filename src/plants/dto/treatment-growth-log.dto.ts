import { PlantGrowthLogType } from "prisma/generated/enums";
import { PlantGrowthLogBaseDTO } from "./plant-growth-log-base.dto";
import { Prisma } from "prisma/generated/client";
import { IPlantGrowthLogDTO } from "../interface/plant-groth-log.dto.interface";

export class TreatmentGrowthLogDTO extends PlantGrowthLogBaseDTO implements IPlantGrowthLogDTO {
  treatment!: {
    description: string;
    product?: string;
  };

  toPrismaCreateInput(
    plantId: string
  ): Prisma.PlantGrowthLogCreateInput {
    this.assertType(PlantGrowthLogType.SPECIAL_TREATMENT);

    return {
      ...this.baseCreateInput(plantId),
      treatmentLog: {
        create: {
          ...this.treatment,
        },
      },
    };
  }

  private assertType(expected: PlantGrowthLogType) {
    if (this.type !== expected) {
      throw new Error(`Invalid type for treatment log`);
    }
  }
}
