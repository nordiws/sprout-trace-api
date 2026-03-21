import { SeedWithStrain } from '../repository/seeds.repository.types'
import { SeedItemDTO } from './seed-item.dto'

export class SeedDetailsDTO extends SeedItemDTO {
  code: string

  strain: string
  viabilityTest: string | null
  flavor: string | null
  supplier: string | null
  batchNumber: string | null
  feminized: boolean | null
  autoflowering: boolean | null
  parentGeneration: string | null
  collectionMethod: string | null
  processingDate: Date | null
  expirationDate: Date | null
  storageConditions: string | null

  static fromEntity(entity: SeedWithStrain): SeedDetailsDTO {
    return {
      id: entity.id,
      code: entity.code,
      name: entity.name,
      nombreCultivar: entity.nombreCultivar,
      strain: entity.strain.name,
      strainId: entity.strain.id,
      strainName: entity.strain.name,
      harvestYear: entity.harvestYear,
      flavorProfile: entity.flavour,
      totalSeeds: entity.totalSeeds,
      germinationRate: entity.germinationRate,
      viabilityTest: entity.viabilityTest,
      daysTillHarvest: entity.daysTillHarvest,
      country: entity.country,
      inscriptionCode: entity.inscriptionCode,
      flavor: entity.flavour,
      supplier: entity.supplier,
      batchNumber: entity.batchNumber,
      feminized: entity.feminized,
      autoflowering: entity.autoflowering,
      parentGeneration: entity.parentGeneration,
      collectionMethod: entity.collectionMethod,
      processingDate: entity.processingDate,
      createdAt: entity.createdAt,
      expirationDate: entity.expirationDate,
      storageConditions: entity.storageConditions,
    }
  }
}
