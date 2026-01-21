import { Plant, PlantStatus } from '@prisma/client'

export class PlantDTO {
  id: string
  code: string
  status: PlantStatus
  createdAt?: string
  height?: number
  health?: string
  location?: string
  expectedHarvestDate?: string
  notes?: string

  static fromEntity(entity: Plant): PlantDTO {
    return {
      id: entity.id,
      code: entity.code,
      status: entity.status,
      createdAt: entity.createdAt.toISOString(),
      height: entity.height ?? undefined,
      health: entity.health,
      location: entity.location ?? undefined,
      expectedHarvestDate: entity.expectedHarvest.toISOString(),
      notes: entity.notes ?? undefined,
    }
  }
}
