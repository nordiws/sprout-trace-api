import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { GrowDifficulty, StrainType, YieldLevel } from "prisma/generated/enums";

export class CreateStrainDTO {
  @IsString()
  name: string;

  @IsEnum(StrainType)
  type: StrainType;

  @IsString()
  genetics: string;

  @IsString()
  thc: string;

  @IsString()
  cbd: string;

  @IsString()
  floweringTime: string;

  @IsString()
  description: string;

  @IsDateString()
  dateAdded: string;

  @IsOptional()
  @IsString()
  origin?: string;

  @IsOptional()
  @IsString()
  breeder?: string;

  @IsOptional()
  @IsEnum(GrowDifficulty)
  difficulty?: GrowDifficulty;

  @IsOptional()
  @IsEnum(YieldLevel)
  yield?: YieldLevel;

  @IsOptional()
  @IsString()
  preferredEnv?: string;

  @IsOptional()
  @IsString()
  resistance?: string;

  @IsOptional()
  @IsString()
  growthPattern?: string;
}
