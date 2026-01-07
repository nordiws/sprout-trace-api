import { IsDateString, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { PlantHealth, PlantStatus } from "prisma/generated/enums";

export class CreatePlantDTO {
  @IsString()
  id: string;

  @IsEnum(PlantStatus)
  status: PlantStatus;

  @IsDateString()
  plantedDate: string;

  @IsOptional()
  @IsDateString()
  floweringDate?: string;

  @IsDateString()
  expectedHarvest: string;

  @IsString()
  height: string;

  @IsEnum(PlantHealth)
  health: PlantHealth;

  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsInt()
  strainId: number;

  @IsString()
  harvestId: string;
}
