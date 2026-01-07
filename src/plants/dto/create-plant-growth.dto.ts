import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { PlantPhase } from "prisma/generated/enums";

export class CreatePlantGrowthLogDTO {
  @IsDateString()
  date: string;

  @IsString()
  height: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsEnum(PlantPhase)
  phase: PlantPhase;
}
