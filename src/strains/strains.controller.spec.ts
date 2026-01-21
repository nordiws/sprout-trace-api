import { randomUUID } from 'crypto'
import { Test } from '@nestjs/testing'
import { StrainsController } from './strains.controller'
import { StrainsService } from './strains.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import type { CurrentUserContext } from 'src/auth/types/auth.type'
import type { StrainFiltersDTO } from './dto/strain-filter.dto'
import type { CreateStrainDTO } from './dto/create-strain.dto'
import type { UpdateStrainDTO } from './dto/update-strain.dto'

/**
 * Mock @CurrentUser decorator
 */
jest.mock('src/auth/decorators/current-user.decorator', () => ({
  CurrentUser: () => (_target: any, _key: string, index: number) => {
    Reflect.defineMetadata('custom:currentUserIndex', index, _target)
  },
}))

describe('StrainsController', () => {
  let controller: StrainsController
  let service: jest.Mocked<StrainsService>

  const userId = randomUUID()
  const strainId = randomUUID()

  const user: CurrentUserContext = {
    id: userId,
    email: 'test@gmail.com',
  }

  beforeEach(async () => {
    const mockService: jest.Mocked<StrainsService> = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
    } as any

    const module = await Test.createTestingModule({
      controllers: [StrainsController],
      providers: [
        {
          provide: StrainsService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile()

    controller = module.get(StrainsController)
    service = module.get(StrainsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call findAll with user id and filters', async () => {
    const filters: StrainFiltersDTO = {
      page: 1,
      limit: 10,
    }

    const expectedResult = [{ id: strainId }]

    service.findAll.mockResolvedValue(expectedResult as any)

    const result = await controller.findAll(user, filters)

    expect(service.findAll).toHaveBeenCalledWith(userId, filters)
    expect(result).toEqual(expectedResult)
  })

  it('should call findOne with user id and strain id', async () => {
    const expectedResult = { id: strainId }

    service.findOne.mockResolvedValue(expectedResult as any)

    const result = await controller.findOne(user, strainId)

    expect(service.findOne).toHaveBeenCalledWith(userId, strainId)
    expect(result).toEqual(expectedResult)
  })

  it('should call create with user id and dto', async () => {
    const dto: CreateStrainDTO = {
      name: 'Strain A',
    } as any

    const expectedResult = { id: strainId }

    service.create.mockResolvedValue(expectedResult as any)

    const result = await controller.create(user, dto)

    expect(service.create).toHaveBeenCalledWith(userId, dto)
    expect(result).toEqual(expectedResult)
  })

  it('should call update with user id, strain id and dto', async () => {
    const dto: UpdateStrainDTO = {
      name: 'Updated Strain',
    } as any

    const expectedResult = { id: strainId }

    service.update.mockResolvedValue(expectedResult as any)

    const result = await controller.update(user, strainId, dto)

    expect(service.update).toHaveBeenCalledWith(userId, strainId, dto)
    expect(result).toEqual(expectedResult)
  })

  it('should call softDelete with user id and strain id', async () => {
    service.softDelete.mockResolvedValue(undefined)

    const result = await controller.remove(user, strainId)

    expect(service.softDelete).toHaveBeenCalledWith(userId, strainId)
    expect(result).toBeUndefined()
  })
})
