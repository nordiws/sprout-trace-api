import { PartialType } from '@nestjs/swagger'
import { CreatePlantDTO } from './create-plant.dto'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { QualityGrade } from '@prisma/client'

export class UpdatePlantDTO extends PartialType(CreatePlantDTO) {
  @IsOptional()
  @IsString()
  potSize?: string

  @IsOptional()
  @IsString()
  wetWeight?: string

  @IsOptional()
  @IsString()
  dryWeight?: string

  @IsOptional()
  @IsEnum(QualityGrade)
  quality?: QualityGrade

  @IsOptional()
  @IsString()
  ph?: string

  @IsOptional()
  @IsString()
  ec?: string

  @IsOptional()
  @IsString()
  temperature?: string

  @IsOptional()
  @IsString()
  humidity?: string

  @IsOptional()
  @IsString()
  nutrients?: string

  @IsOptional()
  @IsString()
  training?: string

  @IsOptional()
  @IsString()
  lastWatered?: string

  @IsOptional()
  @IsString()
  nextWatering?: string
}
