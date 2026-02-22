import { randomUUID } from 'crypto'
import { Test } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { HarvestsService } from './harvests.service'
import { HarvestsRepository } from './repository/harvests.repository'
import { HarvestTimelineRepository } from './repository/harvests-timeline.repository'
import { Harvest } from '@prisma/client'
import { PaginationDTO } from 'src/common/dto/pagination.dto'
import type { HarvestFiltersDTO } from './dto/harvest-filter.dto'
import type { CreateHarvestDTO } from './dto/create-harvest.dto'
import type { UpdateHarvestDTO } from './dto/update-harvest.dto'
import type { CreateHarvestTimelineDTO } from './dto/create-harvest-timeline.dto'
import { HarvestWithPlants } from './repository/harvests.repository.types'

describe('HarvestsService', () => {
  let service: HarvestsService
  let harvestsRepository: jest.Mocked<HarvestsRepository>
  let harvestTimelineRepository: jest.Mocked<HarvestTimelineRepository>

  const userId = randomUUID()
  const harvestId = randomUUID()
  const timelineId = randomUUID()

  const harvestEntity: Harvest = {
    id: harvestId,
    userId,
    name: 'Harvest 2025',
    active: true,
    startDate: new Date('2025-01-01'),
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Harvest

  const harvestWithPlantsEntity: HarvestWithPlants = {
    ...harvestEntity,
    plants: [],
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        HarvestsService,
        {
          provide: HarvestsRepository,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            softDelete: jest.fn<Promise<void>, [string, string]>(),
          },
        },
        {
          provide: HarvestTimelineRepository,
          useValue: {
            addEvent: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get(HarvestsService)
    harvestsRepository = module.get(HarvestsRepository)
    harvestTimelineRepository = module.get(HarvestTimelineRepository)
  })

  describe('findAll', () => {
    it('should return mapped data with pagination', async () => {
      const filters: HarvestFiltersDTO = {
        page: 1,
        limit: 10,
      }

      harvestsRepository.findAll.mockResolvedValue({
        total: 1,
        data: [harvestWithPlantsEntity],
      })

      const result = await service.findAll(userId, filters)

      expect(harvestsRepository.findAll).toHaveBeenCalledWith(userId, filters)
      expect(result.harvests).toHaveLength(1)
      expect(result.pagination).toEqual(
        PaginationDTO.mapper(filters.page, filters.limit, 1),
      )
    })
  })

  describe('findOne', () => {
    it('should return harvest details when found', async () => {
      harvestsRepository.findOne.mockResolvedValue(harvestEntity)

      const result = await service.findOne(userId, harvestId)

      expect(harvestsRepository.findOne).toHaveBeenCalledWith(userId, harvestId)
      expect(result.id).toBe(harvestId)
    })

    it('should throw NotFoundException when harvest does not exist', async () => {
      harvestsRepository.findOne.mockResolvedValue(null)

      await expect(service.findOne(userId, harvestId)).rejects.toThrow(
        NotFoundException,
      )
    })
  })

  describe('create', () => {
    it('should create and return harvest details', async () => {
      const dto: CreateHarvestDTO = {
        toEntity: jest.fn().mockReturnValue({
          userId,
          name: 'Harvest 2025',
        }),
      } as any

      harvestsRepository.create.mockResolvedValue(harvestEntity)

      const result = await service.create(userId, dto)

      expect(dto.toEntity).toHaveBeenCalledWith(userId)
      expect(harvestsRepository.create).toHaveBeenCalled()
      expect(result.id).toBe(harvestId)
    })
  })

  describe('update', () => {
    it('should update harvest after existence check', async () => {
      const name = 'Updated Harvest'
      const dto: UpdateHarvestDTO = {
        name: name,
      } as any

      harvestsRepository.findOne.mockResolvedValue(harvestEntity)
      harvestsRepository.update.mockResolvedValue({
        ...harvestEntity,
        name: name,
      })

      const result = await service.update(userId, harvestId, dto)

      expect(harvestsRepository.findOne).toHaveBeenCalledWith(userId, harvestId)
      expect(harvestsRepository.update).toHaveBeenCalledWith(harvestId, dto)
      expect(result.name).toBe(name)
    })
  })

  describe('softDelete', () => {
    it('should soft delete harvest after existence check', async () => {
      harvestsRepository.findOne.mockResolvedValue(harvestEntity)
      harvestsRepository.softDelete.mockResolvedValue(undefined)

      await service.softDelete(userId, harvestId)

      expect(harvestsRepository.findOne).toHaveBeenCalledWith(userId, harvestId)
      expect(harvestsRepository.softDelete).toHaveBeenCalledWith(
        userId,
        harvestId,
      )
    })
  })

  describe('addTimelineEvent', () => {
    it('should add timeline event to existing harvest', async () => {
      const dto: CreateHarvestTimelineDTO = {
        toEntity: jest.fn().mockReturnValue({
          harvestId,
          description: 'Planted seeds',
        }),
      } as any

      harvestsRepository.findOne.mockResolvedValue(harvestEntity)
      harvestTimelineRepository.addEvent.mockResolvedValue({
        id: timelineId,
      } as any)

      const result = await service.addTimelineEvent(userId, harvestId, dto)

      expect(harvestsRepository.findOne).toHaveBeenCalledWith(userId, harvestId)
      expect(dto.toEntity).toHaveBeenCalledWith(harvestId)
      expect(harvestTimelineRepository.addEvent).toHaveBeenCalled()
      expect(result.id).toBe(timelineId)
    })
  })
})
