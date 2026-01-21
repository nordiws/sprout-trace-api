import {
  Harvest,
  HarvestStatus,
  HarvestType,
  QualityGrade,
} from '@prisma/client'

export class HarvestDetailsDTO {
  id: string
  name: string
  code: string
  startDate: string
  endDate?: string

  status: HarvestStatus
  harvestType: HarvestType

  notes?: string

  harvestMethod?: string
  dryingMethod?: string
  dryingLocation?: string
  curingMethod?: string
  qualityGrade?: QualityGrade

  dryingTemperature?: string
  dryingHumidity?: string
  moistureContent?: string
  trimLoss?: string

  active: boolean
  createdAt: string
  updatedAt: string

  static fromEntity(entity: Harvest): HarvestDetailsDTO {
    return {
      id: entity.id,
      name: entity.name,
      code: entity.code,
      startDate: entity.startDate.toISOString(),
      endDate: entity.endDate?.toISOString(),

      status: entity.status,
      harvestType: entity.harvestType,
      notes: entity.notes ?? undefined,

      harvestMethod: entity.harvestMethod ?? undefined,
      dryingMethod: entity.dryingMethod ?? undefined,
      dryingLocation: entity.dryingLocation ?? undefined,
      curingMethod: entity.curingMethod ?? undefined,
      qualityGrade: entity.qualityGrade ?? undefined,

      dryingTemperature: entity.dryingTemperature ?? undefined,
      dryingHumidity: entity.dryingHumidity ?? undefined,
      moistureContent: entity.moistureContent ?? undefined,
      trimLoss: entity.trimLoss ?? undefined,

      active: entity.active,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    }
  }
}
