import { IPlantGrowthLogDTO } from '../interface/plant-groth-log.dto.interface'
import { PlantGrowthLogBaseDTO } from './plant-growth-log-base.dto'
import { PlantGrowthLogType, Prisma } from '@prisma/client'

export class MeasurementGrowthLogDTO
  extends PlantGrowthLogBaseDTO
  implements IPlantGrowthLogDTO
{
  measurement!: {
    height?: number
    temperature?: string
    humidity?: string
    ph?: string
    ec?: string
  }

  toPrismaCreateInput(plantId: string): Prisma.PlantGrowthLogCreateInput {
    this.assertType('MEASUREMENT')

    return {
      ...this.baseCreateInput(plantId),
      measurement: {
        create: {
          ...this.measurement,
        },
      },
    }
  }

  private assertType(expected: PlantGrowthLogType) {
    if (this.type !== expected) {
      throw new Error(`Invalid type for measurement log`)
    }
  }
}
