import { randomUUID } from 'crypto'
import { Test } from '@nestjs/testing'
import { SeedsController } from './seeds.controller'
import { SeedsService } from './seeds.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import type { CurrentUserContext } from 'src/auth/types/auth.type'
import type { SeedFiltersDTO } from './dto/seed-filter.dto'
import type { CreateSeedDTO } from './dto/create-seed.dto'
import type { UpdateSeedDTO } from './dto/update-seed.dto'

/**
 * Mock @CurrentUser decorator
 */
jest.mock('src/auth/decorators/current-user.decorator', () => ({
  CurrentUser: () => (_target: any, _key: string, index: number) => {
    Reflect.defineMetadata('custom:currentUserIndex', index, _target)
  },
}))

describe('SeedsController', () => {
  let controller: SeedsController
  let service: jest.Mocked<SeedsService>

  const userId = randomUUID()
  const seedId = randomUUID()

  const user: CurrentUserContext = {
    id: userId,
    email: 'test@gmail.com',
  }

  beforeEach(async () => {
    const mockService: jest.Mocked<SeedsService> = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
    } as any

    const module = await Test.createTestingModule({
      controllers: [SeedsController],
      providers: [
        {
          provide: SeedsService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile()

    controller = module.get(SeedsController)
    service = module.get(SeedsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call findAll with user id and filters', async () => {
    const filters: SeedFiltersDTO = {
      page: 1,
      limit: 10,
    }

    const expectedResult = [{ id: seedId }]

    service.findAll.mockResolvedValue(expectedResult as any)

    const result = await controller.findAll(user, filters)

    expect(service.findAll).toHaveBeenCalledWith(userId, filters)
    expect(result).toEqual(expectedResult)
  })

  it('should call findOne with user id and seed id', async () => {
    const expectedResult = { id: seedId }

    service.findOne.mockResolvedValue(expectedResult as any)

    const result = await controller.findOne(user, seedId)

    expect(service.findOne).toHaveBeenCalledWith(userId, seedId)
    expect(result).toEqual(expectedResult)
  })

  it('should call create with user id and dto', async () => {
    const dto: CreateSeedDTO = {
      name: 'Seed A',
    } as any

    const expectedResult = { id: seedId }

    service.create.mockResolvedValue(expectedResult as any)

    const result = await controller.create(user, dto)

    expect(service.create).toHaveBeenCalledWith(userId, dto)
    expect(result).toEqual(expectedResult)
  })

  it('should call update with user id, seed id and dto', async () => {
    const dto: UpdateSeedDTO = {
      name: 'Updated Seed',
    } as any

    const expectedResult = { id: seedId }

    service.update.mockResolvedValue(expectedResult as any)

    const result = await controller.update(user, seedId, dto)

    expect(service.update).toHaveBeenCalledWith(userId, seedId, dto)
    expect(result).toEqual(expectedResult)
  })

  it('should call softDelete with user id and seed id', async () => {
    service.softDelete.mockResolvedValue(undefined)

    const result = await controller.remove(user, seedId)

    expect(service.softDelete).toHaveBeenCalledWith(userId, seedId)
    expect(result).toBeUndefined()
  })
})
