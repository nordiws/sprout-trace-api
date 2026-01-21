import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

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

  @IsInt()
  strainId: number

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
}
