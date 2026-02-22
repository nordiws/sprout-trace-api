import { Prisma } from '@prisma/client'
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'
import { generateCode } from 'src/common/utils/string.util'
import { EntityCodePrefix } from 'src/common/enums/entity-code-prefix.enum'

export class CreateSeedDTO {
  @IsString()
  name: string

  @IsString()
  nombreCultivar: string

  @IsString()
  country: string

  @IsString()
  harvestYear: string

  @IsString()
  codigoInscripcion: string

  @IsString()
  flavour: string

  @IsString()
  daysTillHarvest: string

  @IsDateString()
  dateAdded: string

  @IsInt()
  @Min(0)
  germinated: number

  @IsInt()
  @Min(0)
  totalSeeds: number

  @IsString()
  strainId: string

  @IsOptional()
  @IsString()
  supplier?: string

  @IsOptional()
  @IsString()
  batchNumber?: string

  @IsOptional()
  @IsBoolean()
  feminized?: boolean

  @IsOptional()
  @IsBoolean()
  autoflowering?: boolean

  @IsOptional()
  @IsString()
  viabilityTest?: string

  @IsOptional()
  @IsString()
  storageConditions?: string

  @IsOptional()
  @IsDateString()
  expirationDate?: string

  @IsOptional()
  @IsString()
  parentGeneration?: string

  @IsOptional()
  @IsString()
  collectionMethod?: string

  @IsOptional()
  @IsDateString()
  processingDate?: string

  toEntity(userId: string): Prisma.SeedCreateInput {
    return {
      code: generateCode(EntityCodePrefix.SEED),
      name: this.name,
      nombreCultivar: this.nombreCultivar,
      country: this.country,
      harvestYear: this.harvestYear,
      inscriptionCode: this.codigoInscripcion,
      flavour: this.flavour,
      daysTillHarvest: this.daysTillHarvest,
      dateAdded: new Date(this.dateAdded),
      germinated: this.germinated,
      totalSeeds: this.totalSeeds,
      supplier: this.supplier,
      batchNumber: this.batchNumber,
      feminized: this.feminized,
      autoflowering: this.autoflowering,
      viabilityTest: this.viabilityTest,
      storageConditions: this.storageConditions,
      expirationDate: this.expirationDate
        ? new Date(this.expirationDate)
        : undefined,
      parentGeneration: this.parentGeneration,
      collectionMethod: this.collectionMethod,
      processingDate: this.processingDate
        ? new Date(this.processingDate)
        : undefined,
      user: { connect: { id: userId } },
      strain: { connect: { id: this.strainId } },
    }
  }
}
