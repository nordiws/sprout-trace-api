import {
  NutrientApplicationMethod,
  PestSeverity,
  PestType,
  PlantGrowthLogType,
  PlantPhase,
  TrainingIntensity,
  TrainingTechnique,
} from '@prisma/client'
import { Type } from 'class-transformer'
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator'

export class MeasurementLogDTO {
  @IsOptional()
  @IsString()
  height?: string

  @IsOptional()
  @IsString()
  temperature?: string

  @IsOptional()
  @IsString()
  humidity?: string

  @IsOptional()
  @IsString()
  ph?: string

  @IsOptional()
  @IsString()
  ec?: string
}

export class NutrientLogDTO {
  @IsString()
  nutrientName!: string

  @IsString()
  product!: string

  @IsString()
  dosage!: string

  @IsEnum(NutrientApplicationMethod)
  method!: NutrientApplicationMethod
}

export class PestLogDTO {
  @IsEnum(PestType)
  pestType!: PestType

  @IsEnum(PestSeverity)
  @IsOptional()
  severity!: PestSeverity

  @IsOptional()
  @IsString()
  actionTaken?: string

  @IsString()
  symptoms: string
}

export class TrainingLogDTO {
  @IsEnum(TrainingTechnique)
  technique!: TrainingTechnique

  @IsEnum(TrainingIntensity)
  @IsOptional()
  intensity?: TrainingIntensity
}

export class TreatmentLogDTO {
  @IsString()
  description!: string

  @IsOptional()
  @IsString()
  product?: string
}

export class CreatePlantGrowthLogDTO {
  @IsDateString()
  date!: string

  @IsEnum(PlantGrowthLogType)
  type!: PlantGrowthLogType

  @IsEnum(PlantPhase)
  phase!: PlantPhase

  @IsOptional()
  @IsString()
  notes?: string

  /* -------------------- MEASUREMENT -------------------- */

  @ValidateIf(
    (dto: CreatePlantGrowthLogDTO) =>
      dto.type === PlantGrowthLogType.MEASUREMENT,
  )
  @ValidateNested()
  @Type(() => MeasurementLogDTO)
  measurementLog?: MeasurementLogDTO

  /* -------------------- NUTRIENTS -------------------- */

  @ValidateIf(
    (dto: CreatePlantGrowthLogDTO) => dto.type === PlantGrowthLogType.NUTRIENTS,
  )
  @ValidateNested()
  @Type(() => NutrientLogDTO)
  nutrientLog?: NutrientLogDTO

  /* -------------------- PEST -------------------- */

  @ValidateIf(
    (dto: CreatePlantGrowthLogDTO) =>
      dto.type === PlantGrowthLogType.PEST_ISSUE,
  )
  @ValidateNested()
  @Type(() => PestLogDTO)
  pestLog?: PestLogDTO

  /* -------------------- TRAINING -------------------- */

  @ValidateIf(
    (dto: CreatePlantGrowthLogDTO) => dto.type === PlantGrowthLogType.TRAINING,
  )
  @ValidateNested()
  @Type(() => TrainingLogDTO)
  trainingLog?: TrainingLogDTO

  /* -------------------- SPECIAL TREATMENT -------------------- */

  @ValidateIf(
    (dto: CreatePlantGrowthLogDTO) =>
      dto.type === PlantGrowthLogType.SPECIAL_TREATMENT,
  )
  @ValidateNested()
  @Type(() => TreatmentLogDTO)
  treatmentLog?: TreatmentLogDTO
}
