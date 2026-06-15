import { PlantGrowthLog, PlantGrowthLogType, QualityGrade } from '@prisma/client'
import { PlantWithStrainSeedHarvestLogs } from '../repository/plants.repository.types'
import { PlantDTO } from './plant.dto'
import { calculateAgeInDays, calculateCurrentWeek } from 'src/common/utils/date.util'

export class PlantDetailsDTO extends PlantDTO {
  floweringDate?: string
  notes?: string
  age?: number
  currentWeek?: number
  nutrients?: string
  ph?: string
  ec?: string
  temperature?: string
  humidity?: string
  training?: string
  lastWatered?: string;
  nextWatering?: string;
  potSize?: string;
  wetWeight?: string;
  dryWeight?: string;
  quality?: QualityGrade;
  growthLogs?: PlantGrowthLog[];

  static fromEntity(entity: PlantWithStrainSeedHarvestLogs): PlantDetailsDTO {
    return {
      id: entity.id,
      code: entity.code,
      status: entity.status,
      height: entity.height ?? undefined,
      health: entity.health ?? undefined,
      location: entity.location ?? undefined,
      expectedHarvestDate: entity.expectedHarvest.toISOString(),
      expectedFloweringDate: entity.expectedFlowering?.toISOString(),
      floweringDate: entity.floweringDate?.toISOString(),
      plantedDate: entity.plantedDate.toISOString(),
      notes: entity.notes ?? undefined,
      imageUrl: entity.imageUrl ?? undefined,
      age: calculateAgeInDays(entity.plantedDate),
      strainId: entity.strain.id,
      strainName: entity.strain.name,
      seedId: entity.seed?.id ?? undefined,
      seedName: entity.seed?.name ?? undefined,
      harvestId: entity.harvest?.id ?? undefined,
      harvestName: entity.harvest?.name ?? undefined,
      currentWeek: calculateCurrentWeek(entity.plantedDate),
      lightCycle: entity.lightCycle ?? undefined,
      nutrients: entity.nutrients ?? undefined,
      ph: entity.ph ?? undefined,
      ec: entity.ec ?? undefined,
      temperature: entity.temperature ?? undefined,
      humidity: entity.humidity ?? undefined,
      training: entity.training ?? undefined,
      lastWatered: entity.lastWatered ?? undefined,
      nextWatering: entity.nextWatering ?? undefined,
      potSize: entity.potSize ?? undefined,
      wetWeight: entity.wetWeight ?? undefined,
      dryWeight: entity.dryWeight ?? undefined,
      quality: entity.quality ?? undefined,
      growthLogs: entity.growthLogs ?? [],
    }
  }
}
