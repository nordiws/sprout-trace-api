import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { Prisma } from "prisma/generated/client";
import { GrowDifficulty, StrainType, YieldLevel } from "prisma/generated/enums";
import { EntityCodePrefix } from "src/common/enums/entity-code-prefix.enum";
import { generateCode } from "src/common/utils/string.util";

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

  toEntity(userId: string): Prisma.StrainCreateInput {
    return {
      code: generateCode(EntityCodePrefix.STRAIN),
      name: this.name,
      type: this.type,
      genetics: this.genetics,
      thc: this.thc,
      cbd: this.cbd,
      floweringTime: this.floweringTime,
      description: this.description,
      dateAdded: new Date(this.dateAdded),
      origin: this.origin,
      breeder: this.breeder,
      difficulty: this.difficulty,
      yield: this.yield,
      preferredEnv: this.preferredEnv,
      resistance: this.resistance,
      growthPattern: this.growthPattern,
      user: { connect: { id: userId } }
    }
  }
}