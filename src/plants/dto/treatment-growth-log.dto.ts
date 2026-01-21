import { PlantGrowthLogType, Prisma, TreatmentType } from '@prisma/client'
import { PlantGrowthLogBaseDTO } from './plant-growth-log-base.dto'
import { IPlantGrowthLogDTO } from '../interface/plant-groth-log.dto.interface'

export class TreatmentGrowthLogDTO
  extends PlantGrowthLogBaseDTO
  implements IPlantGrowthLogDTO
{
  treatment!: {
    type: TreatmentType
    reason: string
    productName?: string
    dosage?: string
    appliedBy?: string
  }

  toPrismaCreateInput(plantId: string): Prisma.PlantGrowthLogCreateInput {
    this.assertType(PlantGrowthLogType.SPECIAL_TREATMENT)

    return {
      ...this.baseCreateInput(plantId),
      treatmentLog: {
        create: {
          treatmentType: this.treatment.type,
          reason: this.treatment.reason,
          productName: this.treatment.productName ?? null,
          dosage: this.treatment.dosage ?? null,
          appliedBy: this.treatment.appliedBy ?? null,
        },
      },
    }
  }

  private assertType(expected: PlantGrowthLogType) {
    if (this.type !== expected) {
      throw new Error(`Invalid type for treatment log`)
    }
  }
}
