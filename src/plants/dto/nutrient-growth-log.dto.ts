import {
  NutrientApplicationMethod,
  PlantGrowthLogType,
  Prisma,
} from '@prisma/client'
import { PlantGrowthLogBaseDTO } from './plant-growth-log-base.dto'
import { IPlantGrowthLogDTO } from '../interface/plant-groth-log.dto.interface'

export class NutrientGrowthLogDTO
  extends PlantGrowthLogBaseDTO
  implements IPlantGrowthLogDTO
{
  nutrient!: {
    nutrientName: string
    product: string
    dosage: string
    method: NutrientApplicationMethod
  }

  toPrismaCreateInput(plantId: string): Prisma.PlantGrowthLogCreateInput {
    this.assertType(PlantGrowthLogType.NUTRIENTS)

    return {
      ...this.baseCreateInput(plantId),
      nutrientLog: {
        create: {
          ...this.nutrient,
        },
      },
    }
  }

  private assertType(expected: PlantGrowthLogType) {
    if (this.type !== expected) {
      throw new Error(`Invalid type for nutrient log`)
    }
  }
}
