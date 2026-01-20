import { Seed } from "prisma/generated/client"

export class SeedDTO {

    id: string
    code: string
    name: string
    cultivarName: string
    totalSeeds: number
    germinationRate: string | null
    viabilityTest: string | null
    daysTillHarvest: string | null
    country: string
    inscriptionCode: string
    flavorProfile: string | null
    supplier: string | null
    batchNumber: string | null
    feminized: boolean | null
    autoflowering: boolean | null
    parentGeneration: string | null
    collectionMethod: string | null
    processingDate: Date | null
    createdAt: Date
    expirationDate: Date | null
    storageConditions: string | null

    static fromEntity(entity: Seed): SeedDTO {
        return {
            id: entity.id,
            code: entity.code,
            name: entity.name,
            cultivarName: entity.nombreCultivar,
            totalSeeds: entity.totalSeeds,
            germinationRate: entity.germinationRate,
            viabilityTest: entity.viabilityTest,
            daysTillHarvest: entity.daysTillHarvest,
            country: entity.country,
            inscriptionCode: entity.inscriptionCode,
            flavorProfile: entity.flavorProfile,
            supplier: entity.supplier,
            batchNumber: entity.batchNumber,
            feminized: entity.feminized,
            autoflowering: entity.autoflowering,
            parentGeneration: entity.parentGeneration,
            collectionMethod: entity.collectionMethod,
            processingDate: entity.processingDate,
            createdAt: entity.createdAt,
            expirationDate: entity.expirationDate,
            storageConditions: entity.storageConditions
        }
    }
}