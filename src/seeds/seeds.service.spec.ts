import { randomUUID } from 'crypto'
import { Test } from '@nestjs/testing'
import { SeedsService } from './seeds.service'
import { SeedsRepository } from './repository/seeds.repository'
import { PaginationDTO } from 'src/common/dto/pagination.dto'
import type { SeedFiltersDTO } from './dto/seed-filter.dto'
import { Seed, Strain } from '@prisma/client'
import { SeedWithStrain } from './repository/seeds.repository.types'

describe('SeedsService', () => {
  let service: SeedsService
  let seedsRepository: jest.Mocked<SeedsRepository>

  const userId = randomUUID()
  const seedId = randomUUID()

  const seedEntity: Seed = {
    name: 'Seed A',
    id: seedId,
    code: 'CODE123',
    nombreCultivar: 'Cultivar X',
    country: 'Country Y',
    harvestYear: '2023',
    inscriptionCode: 'INSCODE123',
    flavour: 'Flavour A',
    daysTillHarvest: '100',
    dateAdded: new Date(),
    totalSeeds: 100,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    germinationRate: null,
    supplier: null,
    batchNumber: null,
    feminized: null,
    autoflowering: null,
    viabilityTest: null,
    storageConditions: null,
    expirationDate: null,
    parentGeneration: null,
    collectionMethod: null,
    processingDate: null,
    flavorProfile: null,
    strainId: '',
    userId: '',
  }

  const strainEntity: Strain = {
    id: randomUUID(),
    name: 'Strain A',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    code: '',
    dateAdded: new Date(),
    userId: '',
    type: 'INDICA',
    genetics: '',
    thc: '',
    cbd: '',
    floweringTime: '',
    description: '',
    origin: null,
    breeder: null,
    difficulty: null,
    yield: null,
    preferredEnv: null,
    resistance: null,
    growthPattern: null,
    gennetics: null,
    effects: null,
    terpenes: null,
    medicalUses: null,
  }

  const seedWithStrain: SeedWithStrain = {
    ...seedEntity,
    strain: strainEntity,
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SeedsService,
        {
          provide: SeedsRepository,
          useValue: {
            findAll: jest.fn(),
            findByIdWithStrain: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            softDelete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get(SeedsService)
    seedsRepository = module.get(SeedsRepository)
  })

  describe('findAll', () => {
    it('should return mapped seeds with pagination', async () => {
      const filters: SeedFiltersDTO = {
        page: 1,
        limit: 10,
      }

      seedsRepository.findAll.mockResolvedValue({
        data: [seedWithStrain],
        total: 1,
      })

      const result = await service.findAll(userId, filters)

      expect(seedsRepository.findAll).toHaveBeenCalledWith(userId, filters)
      expect(result.seeds).toHaveLength(1)
      expect(result.pagination).toEqual(
        PaginationDTO.mapper(filters.page, filters.limit, 1),
      )
    })
  })

  describe('findOne', () => {
    it('should return seed details when found', async () => {
      seedsRepository.findByIdWithStrain.mockResolvedValue(seedWithStrain)

      const result = await service.findOne(userId, seedId)

      expect(seedsRepository.findByIdWithStrain).toHaveBeenCalledWith(
        userId,
        seedId,
      )
      expect(result.id).toBe(seedId)
    })

    it('should throw error when seed is not found', async () => {
      seedsRepository.findByIdWithStrain.mockResolvedValue(null)

      await expect(service.findOne(userId, seedId)).rejects.toThrow(
        'Seed not found',
      )
    })
  })

  describe('create', () => {
    it('should create and return seed DTO', async () => {
      const dto = {
        toEntity: jest.fn().mockReturnValue({
          userId,
          name: 'Seed A',
        }),
      }

      seedsRepository.create.mockResolvedValue(seedEntity)

      const result = await service.create(userId, dto)

      expect(dto.toEntity).toHaveBeenCalledWith(userId)
      expect(seedsRepository.create).toHaveBeenCalled()
      expect(result.id).toBe(seedId)
    })
  })

  describe('update', () => {
    it('should update seed and return DTO', async () => {
      const name = 'Updated Seed'
      const updateDto = {
        name: name,
      }

      seedsRepository.update.mockResolvedValue({
        ...seedEntity,
        name: name,
      })

      const result = await service.update(userId, seedId, updateDto)

      expect(seedsRepository.update).toHaveBeenCalledWith(
        userId,
        seedId,
        updateDto,
      )
      expect(result.name).toBe(name)
    })
  })

  describe('softDelete', () => {
    it('should soft delete seed', async () => {
      seedsRepository.softDelete.mockResolvedValue()

      await service.softDelete(userId, seedId)

      expect(seedsRepository.softDelete).toHaveBeenCalledWith(userId, seedId)
    })
  })
})
