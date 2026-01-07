import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { Harvest } from "prisma/generated/client";
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


  toEntity(userId: string): Harvest {
    return {
      userId,
      id: this.id,
      name: this.name,
      startDate: new Date(this.startDate),
      endDate: this.endDate ? new Date(this.endDate) : null,
      status: this.status,
      harvestType: this.harvestType,
      notes: this.notes ?? null,
      harvestMethod: this.harvestMethod ?? null,
      dryingMethod: this.dryingMethod ?? null,
      dryingLocation: this.dryingLocation ?? null,
      curingMethod: this.curingMethod ?? null,
      qualityGrade: this.qualityGrade ?? null,
      dryingTemperature: this.dryingTemperature ?? null,
      dryingHumidity: this.dryingHumidity ?? null,
      moistureContent: this.moistureContent ?? null,
      trimLoss: this.trimLoss ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
      totalYield: "0 Kg",
    };
  }
}