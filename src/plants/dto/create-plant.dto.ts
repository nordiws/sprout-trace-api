import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator'
import { Prisma } from '@prisma/client'
import { PlantHealth, PlantStatus } from '@prisma/client'
import { EntityCodePrefix } from 'src/common/enums/entity-code-prefix.enum'
import { generateCode } from 'src/common/utils/string.util'

export class CreatePlantDTO {

  @IsOptional()
  @IsEnum(PlantStatus)
  status: PlantStatus

  @IsDateString()
  plantedDate: string

  @IsOptional()
  @IsDateString()
  floweringDate?: string

  @IsDateString()
  expectedHarvestDate: string

  @IsOptional()
  @IsDateString()
  expectedFloweringDate?: string

  @IsOptional()
  @IsInt()
  height: number

  @IsOptional()
  @IsEnum(PlantHealth)
  health: PlantHealth

  @IsString()
  location: string

  @IsOptional()
  @IsString()
  notes?: string

  @IsOptional()
  @IsString()
  image?: string

  @IsString()
  strainId: string

  @IsString()
  harvestId: string

  @IsString()
  seedId: string

  toEntity(userId: string): Prisma.PlantCreateInput {
    return {
      code: generateCode(EntityCodePrefix.PLANT),
      status: this.status || PlantStatus.SEEDLING,
      plantedDate: new Date(this.plantedDate),
      floweringDate: this.floweringDate ? new Date(this.floweringDate) : null,
      expectedHarvest: new Date(this.expectedHarvestDate),
      expectedFlowering: this.expectedFloweringDate ? new Date(this.expectedFloweringDate) : null,
      height: this.height,
      health: this.health,
      location: this.location,
      notes: this.notes,
      image: this.image,
      user: { connect: { id: userId } },
      strain: { connect: { id: this.strainId } },
      harvest: { connect: { id: this.harvestId } },
      seed: { connect: { id: this.seedId } },
    }
  }
}
