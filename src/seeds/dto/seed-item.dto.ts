import { SeedWithStrain } from '../repository/seeds.repository.types'

export class SeedItemDTO {
  id: string
  name: string
  nombreCultivar: string
  strainId: string
  strainName: string
  country: string
  harvestYear: string
  daysTillHarvest: string
  germinationRate: string | null
  inscriptionCode: string
  flavorProfile: string | null
  createdAt: Date
  totalSeeds?: number

  static fromEntity(this: void, entity: SeedWithStrain): SeedItemDTO {
    return {
      id: entity.id,
      name: entity.name,
      nombreCultivar: entity.nombreCultivar,
      strainId: entity.strain.id,
      strainName: entity.strain.name,
      country: entity.country,
      harvestYear: entity.harvestYear,
      daysTillHarvest: entity.daysTillHarvest,
      germinationRate: entity.germinationRate,
      inscriptionCode: entity.inscriptionCode,
      flavorProfile: entity.flavorProfile,
      createdAt: entity.createdAt,
      totalSeeds: entity.totalSeeds
    }
  }
}
