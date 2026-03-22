import { PlantGrowthLog, PlantGrowthLogType, QualityGrade } from '@prisma/client'
import { PlantWithStrainAndLogs } from '../repository/plants.repository.types'
import { PlantDTO } from './plant.dto'
import { calculateAgeInDays, calculateCurrentWeek } from 'src/common/utils/date.util'

export class PlantDetailsDTO extends PlantDTO {
  floweringDate?: string
  notes?: string
  image?: string
  age?: number
  currentWeek?: number
  lightCycle?: string
  nutrients?: string
  ph?: string
  ec?: string
  temperature?: string
  humidity?: string
  training?: string
  lastWatered?: string;
  nextWatering?: string;
  expectedFlowering?: string;
  potSize?: string;
  wetWeight?: string;
  dryWeight?: string;
  quality?: QualityGrade;
  growthLogs?: PlantGrowthLog[];

  static fromEntity(entity: PlantWithStrainAndLogs): PlantDetailsDTO {
    return {
      id: entity.id,
      code: entity.code,
      status: entity.status,
      height: entity.height ?? undefined,
      health: entity.health ?? undefined,
      location: entity.location ?? undefined,
      expectedHarvestDate: entity.expectedHarvest.toISOString(),
      floweringDate: entity.floweringDate?.toISOString(),
      plantedDate: entity.plantedDate.toISOString(),
      notes: entity.notes ?? undefined,
      image: entity.image ?? undefined,
      age: calculateAgeInDays(entity.plantedDate),
      strainId: entity.strain.id,
      strainName: entity.strain.name,
      currentWeek: calculateCurrentWeek(entity.plantedDate),
      lightCycle: entity.lightCycle ?? undefined,
      nutrients: entity.growthLogs.filter((log) => log.type === PlantGrowthLogType.NUTRIENTS).map((log) => log.notes).join(', ') ?? undefined,
      ph: entity.growthLogs.filter((log) => log.type === PlantGrowthLogType.MEASUREMENT).map((log) => log.notes).join(', ') ?? undefined,
      ec: entity.growthLogs.filter((log) => log.type === PlantGrowthLogType.MEASUREMENT).map((log) => log.notes).join(', ') ?? undefined,
      temperature: entity.growthLogs.filter((log) => log.type === PlantGrowthLogType.MEASUREMENT).map((log) => log.notes).join(', ') ?? undefined,
      humidity: entity.growthLogs.filter((log) => log.type === PlantGrowthLogType.MEASUREMENT).map((log) => log.notes).join(', ') ?? undefined,
      training: entity.growthLogs.filter((log) => log.type === PlantGrowthLogType.TRAINING).map((log) => log.notes).join(', ') ?? undefined,
      expectedFlowering: entity.expectedFlowering?.toISOString(),
      potSize: entity.potSize ?? undefined,
      wetWeight: entity.wetWeight ?? undefined,
      dryWeight: entity.dryWeight ?? undefined,
      quality: entity.quality ?? undefined,
      growthLogs: entity.growthLogs ?? [],
    }
  }
}
