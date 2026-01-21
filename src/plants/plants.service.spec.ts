import { randomUUID } from 'crypto'
import { Test } from '@nestjs/testing'
import { PlantsService } from './plants.service'
import { PlantsRepository } from './repository/plants.repository'
import { PlantGrowthLogRepository } from './repository/plants-growth-log.repository'
import { PaginationDTO } from 'src/common/dto/pagination.dto'
import type { PlantFiltersDTO } from './dto/plant-filter.dto'
import type { PlantGrowthLogBaseDTO } from './dto/plant-growth-log-base.dto'
import { Plant, PlantGrowthLog, PlantGrowthLogType, PlantPhase, Prisma, Strain } from '@prisma/client'
import { UpdatePlantDTO } from './dto/update-plant.dto'
import { PlantWithStrain, PlantWithStrainAndLogs } from './repository/plants.repository.types'

describe('PlantsService', () => {
    let service: PlantsService
    let plantsRepository: jest.Mocked<PlantsRepository>
    let growthLogRepository: jest.Mocked<PlantGrowthLogRepository>

    const userId = randomUUID()
    const plantId = randomUUID()
    const growthLogId = randomUUID()

    const plantEntity: Plant = {
        id: plantId,
        userId,
        code: 'Plant A',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        expectedHarvest: new Date(),
    } as Plant

    const strainEntity: Strain = {
        id: randomUUID(),
        name: 'Strain A',
        createdAt: new Date(),
        updatedAt: new Date(),
    } as Strain


    const plantWithStrainEntity: PlantWithStrain = {
        ...plantEntity,
        strain: strainEntity,
    }

    const plantGrowthLogEntity: PlantGrowthLog = {
        id: growthLogId,
        notes: null,
        createdAt: new Date(),
        date: new Date(),
        type: PlantGrowthLogType.MEASUREMENT,
        phase: PlantPhase.VEGETATIVE,
        plantId: plantId,
    } as PlantGrowthLog

    const plantWithStrainAndLogs: PlantWithStrainAndLogs = {
        ...plantEntity,
        strain: strainEntity,
        growthLogs: [plantGrowthLogEntity],
    }

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                PlantsService,
                {
                    provide: PlantsRepository,
                    useValue: {
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        findByIdWithLastLog: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        softDelete: jest.fn<Promise<void>, [string, string]>(),
                    },
                },
                {
                    provide: PlantGrowthLogRepository,
                    useValue: {
                        addGrowthLog: jest.fn(),
                    },
                },
            ],
        }).compile()

        service = module.get(PlantsService)
        plantsRepository = module.get(PlantsRepository)
        growthLogRepository = module.get(PlantGrowthLogRepository)
    })

    describe('findAll', () => {
        it('should return mapped plants with pagination', async () => {
            const filters: PlantFiltersDTO = {
                page: 1,
                limit: 10,
            }

            plantsRepository.findAll.mockResolvedValue({
                data: [plantWithStrainEntity],
                total: 1,
            })

            const result = await service.findAll(userId, filters)

            expect(plantsRepository.findAll).toHaveBeenCalledWith(userId, filters)
            expect(result.plants).toHaveLength(1)
            expect(result.pagination).toEqual(
                PaginationDTO.mapper(filters.page, filters.limit, 1),
            )
        })
    })

    describe('findOne', () => {
        it('should return plant details when found', async () => {
            plantsRepository.findByIdWithLastLog.mockResolvedValue(
                plantWithStrainAndLogs as any,
            )

            const result = await service.findOne(userId, plantId)

            expect(
                plantsRepository.findByIdWithLastLog,
            ).toHaveBeenCalledWith(userId, plantId)
            expect(result.id).toBe(plantId)
        })

        it('should throw error when plant is not found', async () => {
            plantsRepository.findByIdWithLastLog.mockResolvedValue(null)

            await expect(
                service.findOne(userId, plantId),
            ).rejects.toThrow('Plant not found')
        })
    })

    describe('create', () => {
        it('should create and return plant DTO', async () => {
            const dto = {
                toEntity: jest.fn().mockReturnValue({
                    userId,
                    name: 'Plant A',
                }),
            }

            plantsRepository.create.mockResolvedValue(plantEntity as any)

            const result = await service.create(userId, dto)

            expect(dto.toEntity).toHaveBeenCalledWith(userId)
            expect(plantsRepository.create).toHaveBeenCalled()
            expect(result.id).toBe(plantId)
        })
    })

    describe('update', () => {
        it('should update plant after existence check', async () => {
            const dto: UpdatePlantDTO = {
                notes: 'Updated Plant',
            }

            plantsRepository.findOne.mockResolvedValue(plantEntity as any)
            plantsRepository.update.mockResolvedValue({
                ...plantEntity,
                notes: 'Updated Plant',
            } as any)

            const result = await service.update(userId, plantId, dto)

            expect(plantsRepository.findOne).toHaveBeenCalledWith(userId, plantId)
            expect(plantsRepository.update).toHaveBeenCalledWith(
                userId,
                plantId,
                dto,
            )
            expect(result.notes).toBe('Updated Plant')
        })
    })

    describe('softDelete', () => {
        it('should soft delete plant after existence check', async () => {
            plantsRepository.findOne.mockResolvedValue(plantEntity as any)
            plantsRepository.softDelete.mockResolvedValue(undefined)

            await service.softDelete(userId, plantId)

            expect(plantsRepository.findOne).toHaveBeenCalledWith(userId, plantId)
            expect(plantsRepository.softDelete).toHaveBeenCalledWith(
                userId,
                plantId,
            )
        })
    })

    describe('addGrowthLog', () => {
        it('should add growth log after plant existence check', async () => {
            const dto: PlantGrowthLogBaseDTO = {
                toPrismaCreateInput: jest.fn().mockReturnValue({
                    plantId,
                    height: 20,
                }),
            } as any

            plantsRepository.findOne.mockResolvedValue(plantEntity as any)
            growthLogRepository.addGrowthLog.mockResolvedValue({
                id: growthLogId,
            } as any)

            const result = await service.addGrowthLog(userId, plantId, dto)

            expect(plantsRepository.findOne).toHaveBeenCalledWith(userId, plantId)
            expect(dto.toPrismaCreateInput).toHaveBeenCalledWith(plantId)
            expect(growthLogRepository.addGrowthLog).toHaveBeenCalled()
            expect(result.id).toBe(growthLogId)
        })
    })
})
