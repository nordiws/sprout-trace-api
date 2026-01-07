import { PartialType } from "@nestjs/swagger";
import { CreatePlantDTO } from "./create-plant.dto";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { QualityGrade } from "prisma/generated/enums";

export class UpdatePlantDTO extends PartialType(CreatePlantDTO) {
  @IsOptional()
  @IsString()
  wetWeight?: string;

  @IsOptional()
  @IsString()
  dryWeight?: string;

  @IsOptional()
  @IsEnum(QualityGrade)
  quality?: QualityGrade;
}