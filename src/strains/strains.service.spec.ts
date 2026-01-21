import { randomUUID } from 'crypto'
import { Test } from '@nestjs/testing'
import { StrainsService } from './strains.service'
import { StrainsRepository } from './repository/strains.repository'
import { PaginationDTO } from 'src/common/dto/pagination.dto'
import type { StrainFiltersDTO } from './dto/strain-filter.dto'
import { CreateStrainDTO } from './dto/create-strain.dto'
import { Plant, Strain, StrainType } from '@prisma/client'
import { StrainWithPlants } from './repository/strains.repository.types'

describe('StrainsService', () => {
  let service: StrainsService
  let strainsRepository: jest.Mocked<StrainsRepository>

  const userId = randomUUID()
  const strainId = randomUUID()

  const plantEntity: Plant = {
    id: randomUUID(),
    userId,
    strainId,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    code: '',
    status: 'SEEDLING',
    plantedDate: new Date(),
    floweringDate: null,
    expectedHarvest: new Date(),
    height: null,
    health: 'EXCELLENT',
    location: '',
    notes: null,
    image: null,
    age: null,
    currentWeek: null,
    lightCycle: null,
    nutrients: null,
    ph: null,
    ec: null,
    temperature: null,
    humidity: null,
    training: null,
    lastWatered: null,
    nextWatering: null,
    expectedFlowering: null,
    potSize: null,
    wetWeight: null,
    dryWeight: null,
    quality: null,
    harvestId: '',
    seedId: ''
  }

  const strainWithPlantsEntity: StrainWithPlants = {
    id: strainId,
    userId,
    name: 'Strain A',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    code: '',
    type: StrainType.INDICA,
    genetics: '',
    thc: '',
    cbd: '',
    floweringTime: '',
    description: '',
    dateAdded: new Date(),
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
    plants: [plantEntity],
  }

  const strainEntity: Strain = {
    id: strainId,
    userId,
    name: 'Strain A',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    code: '',
    type: StrainType.INDICA,
    genetics: '',
    thc: '',
    cbd: '',
    floweringTime: '',
    description: '',
    dateAdded: new Date(),
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
    medicalUses: null
  }

  const dto: CreateStrainDTO = {
        name: 'Strain A',
        type: StrainType.INDICA,
        genetics: '',
        thc: '',
        cbd: '',
        floweringTime: '',
        description: '',
        dateAdded: new Date(),
        strainId: strainId,
        toEntity: jest.fn().mockReturnValue(strainEntity),
      } as CreateStrainDTO

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        StrainsService,
        {
          provide: StrainsRepository,
          useValue: {
            findAll: jest.fn(),
            findByIdWithPlants: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            softDelete: jest.fn<Promise<void>, [string, string]>(),
          },
        },
      ],
    }).compile()

    service = module.get(StrainsService)
    strainsRepository = module.get(StrainsRepository)
  })

  describe('findAll', () => {
    it('should return mapped strains with pagination', async () => {
      const filters: StrainFiltersDTO = {
        page: 1,
        limit: 10,
      }

      strainsRepository.findAll.mockResolvedValue({
        total: 1,
        data: [strainWithPlantsEntity as any],
      })

      const result = await service.findAll(userId, filters)

      expect(strainsRepository.findAll).toHaveBeenCalledWith(userId, filters)
      expect(result.strains).toHaveLength(1)
      expect(result.pagination).toEqual(
        PaginationDTO.mapper(filters.page, filters.limit, 1),
      )
    })
  })

  describe('findOne', () => {
    it('should return strain details when found', async () => {
      strainsRepository.findByIdWithPlants.mockResolvedValue(
        strainWithPlantsEntity as any,
      )

      const result = await service.findOne(userId, strainId)

      expect(
        strainsRepository.findByIdWithPlants,
      ).toHaveBeenCalledWith(userId, strainId)
      expect(result.id).toBe(strainId)
    })

    it('should throw error when strain is not found', async () => {
      strainsRepository.findByIdWithPlants.mockResolvedValue(null)

      await expect(service.findOne(userId, strainId)).rejects.toThrow(
        'Strain not found',
      )
    })
  })

  describe('create', () => {
    it('should create and return strain DTO', async () => {


      strainsRepository.create.mockResolvedValue(strainEntity as any)

      const result = await service.create(userId, dto as any)

      expect(dto.toEntity).toHaveBeenCalledWith(userId)
      expect(strainsRepository.create).toHaveBeenCalled()
      expect(result.id).toBe(strainId)
    })
  })

  describe('update', () => {
    it('should update strain after existence check', async () => {
      strainsRepository.findOne.mockResolvedValue(strainEntity as any)
      strainsRepository.update.mockResolvedValue({
        ...strainEntity,
        name: 'Updated Strain',
      } as any)

      const result = await service.update(userId, strainId, dto as any)

      expect(strainsRepository.findOne).toHaveBeenCalledWith(userId, strainId)
      expect(strainsRepository.update).toHaveBeenCalledWith(
        userId,
        strainId,
        dto,
      )
      expect(result.name).toBe('Updated Strain')
    })
  })

  describe('softDelete', () => {
    it('should soft delete strain after existence check', async () => {
      strainsRepository.softDelete.mockResolvedValue()

      await service.softDelete(userId, strainId)

      expect(strainsRepository.softDelete).toHaveBeenCalledWith(
        userId,
        strainId,
      )
    })
  })
})
