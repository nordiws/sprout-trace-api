import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { HarvestStatus, HarvestType, QualityGrade } from "prisma/generated/enums";

export class CreateHarvestDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsEnum(HarvestStatus)
  status: HarvestStatus;

  @IsEnum(HarvestType)
  harvestType: HarvestType;

  @IsOptional()
  @IsString()
  notes?: string;

  // Processing
  @IsOptional()
  @IsString()
  harvestMethod?: string;

  @IsOptional()
  @IsString()
  dryingMethod?: string;

  @IsOptional()
  @IsString()
  dryingLocation?: string;

  @IsOptional()
  @IsString()
  curingMethod?: string;

  @IsOptional()
  @IsEnum(QualityGrade)
  qualityGrade?: QualityGrade;

  // Environment
  @IsOptional()
  @IsString()
  dryingTemperature?: string;

  @IsOptional()
  @IsString()
  dryingHumidity?: string;

  @IsOptional()
  @IsString()
  moistureContent?: string;

  @IsOptional()
  @IsString()
  trimLoss?: string;
}
