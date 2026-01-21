import {
  PlantGrowthLogType,
  TrainingIntensity,
  TrainingTechnique,
  Prisma,
} from '@prisma/client'
import { PlantGrowthLogBaseDTO } from './plant-growth-log-base.dto'
import { IPlantGrowthLogDTO } from '../interface/plant-groth-log.dto.interface'

export class TrainingGrowthLogDTO
  extends PlantGrowthLogBaseDTO
  implements IPlantGrowthLogDTO
{
  training!: {
    technique: TrainingTechnique
    intensity?: TrainingIntensity
  }

  toPrismaCreateInput(plantId: string): Prisma.PlantGrowthLogCreateInput {
    this.assertType(PlantGrowthLogType.TRAINING)

    return {
      ...this.baseCreateInput(plantId),
      trainingLog: {
        create: {
          ...this.training,
        },
      },
    }
  }

  private assertType(expected: PlantGrowthLogType) {
    if (this.type !== expected) {
      throw new Error(`Invalid type for training log`)
    }
  }
}
