import { randomUUID } from 'crypto'
import { Test } from '@nestjs/testing'
import { HarvestsController } from './harvests.controller'
import { HarvestsService } from './harvests.service'
import type { CurrentUserContext } from 'src/auth/types/auth.type'
import type { HarvestFiltersDTO } from './dto/harvest-filter.dto'
import type { CreateHarvestDTO } from './dto/create-harvest.dto'
import type { UpdateHarvestDTO } from './dto/update-harvest.dto'
import type { CreateHarvestTimelineDTO } from './dto/create-harvest-timeline.dto'
import { HarvestStatus } from '@prisma/client'

/**
 * Mock @CurrentUser decorator
 */
jest.mock('src/auth/decorators/current-user.decorator', () => ({
  CurrentUser: () => (_target: any, _key: string, index: number) => {
    Reflect.defineMetadata('custom:currentUserIndex', index, _target)
  },
}))

describe('HarvestsController', () => {
  let controller: HarvestsController
  let service: jest.Mocked<HarvestsService>

  const userId = randomUUID()
  const harvestId = randomUUID()
  const timelineId = randomUUID()

  const user: CurrentUserContext = {
    id: userId,
    email: 'test@gmail.com',
  }

  beforeEach(async () => {
    const mockService: jest.Mocked<HarvestsService> = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
      addTimelineEvent: jest.fn(),
    } as any

    const module = await Test.createTestingModule({
      controllers: [HarvestsController],
      providers: [
        {
          provide: HarvestsService,
          useValue: mockService,
        },
      ],
    }).compile()

    controller = module.get(HarvestsController)
    service = module.get(HarvestsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call findAll with user id and filters', async () => {
    const filters: HarvestFiltersDTO = {
      status: HarvestStatus.COMPLETED,
      page: 1,
      limit: 10,
    }
    const expectedResult = [{ id: harvestId }]

    service.findAll.mockResolvedValue(expectedResult as any)

    const result = await controller.findAll(user, filters)

    expect(service.findAll).toHaveBeenCalledWith(userId, filters)
    expect(result).toEqual(expectedResult)
  })

  it('should call findOne with user id and harvest id', async () => {
    const expectedResult = { id: harvestId }

    service.findOne.mockResolvedValue(expectedResult as any)

    const result = await controller.findOne(user, harvestId)

    expect(service.findOne).toHaveBeenCalledWith(userId, harvestId)
    expect(result).toEqual(expectedResult)
  })

  it('should call create with user id and dto', async () => {
    const dto: CreateHarvestDTO = {
      name: 'Harvest 2025',
    } as any

    const expectedResult = { id: harvestId }

    service.create.mockResolvedValue(expectedResult as any)

    const result = await controller.create(user, dto)

    expect(service.create).toHaveBeenCalledWith(userId, dto)
    expect(result).toEqual(expectedResult)
  })

  it('should call update with user id, harvest id and dto', async () => {
    const dto: UpdateHarvestDTO = {
      name: 'Updated Harvest',
    } as any

    const expectedResult = { id: harvestId }

    service.update.mockResolvedValue(expectedResult as any)

    const result = await controller.update(user, harvestId, dto)

    expect(service.update).toHaveBeenCalledWith(userId, harvestId, dto)
    expect(result).toEqual(expectedResult)
  })

  it('should call softDelete with user id and harvest id', async () => {
    service.softDelete.mockResolvedValue(undefined)

    const result = await controller.remove(user, harvestId)

    expect(service.softDelete).toHaveBeenCalledWith(userId, harvestId)
    expect(result).toBeUndefined()
  })

  it('should call addTimelineEvent with user id, harvest id and dto', async () => {
    const dto: CreateHarvestTimelineDTO = {
      description: 'Planted seeds',
    } as any

    const expectedResult = { id: timelineId }

    service.addTimelineEvent.mockResolvedValue(expectedResult as any)

    const result = await controller.addTimelineEvent(user, harvestId, dto)

    expect(service.addTimelineEvent).toHaveBeenCalledWith(
      userId,
      harvestId,
      dto,
    )
    expect(result).toEqual(expectedResult)
  })
})
