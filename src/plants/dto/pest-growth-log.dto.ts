import {
  Prisma,
  PestSeverity,
  PestType,
  PlantGrowthLogType,
} from '@prisma/client'
import { PlantGrowthLogBaseDTO } from './plant-growth-log-base.dto'
import { IPlantGrowthLogDTO } from '../interface/plant-groth-log.dto.interface'

export class PestGrowthLogDTO
  extends PlantGrowthLogBaseDTO
  implements IPlantGrowthLogDTO
{
  pest!: {
    pestType: PestType
    severity: PestSeverity
    actionTaken?: string
    symptoms: string
  }

  toPrismaCreateInput(plantId: string): Prisma.PlantGrowthLogCreateInput {
    this.assertType(PlantGrowthLogType.PEST_ISSUE)

    return {
      ...this.baseCreateInput(plantId),
      pestLog: {
        create: {
          ...this.pest,
        },
      },
    }
  }

  private assertType(expected: PlantGrowthLogType) {
    if (this.type !== expected) {
      throw new Error(`Invalid type for pest log`)
    }
  }
}
