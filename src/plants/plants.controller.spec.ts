import { randomUUID } from 'crypto'
import { Test } from '@nestjs/testing'
import { PlantsController } from './plants.controller'
import { PlantsService } from './plants.service'
import type { CurrentUserContext } from 'src/auth/types/auth.type'
import type { PlantFiltersDTO } from './dto/plant-filter.dto'
import type { CreatePlantDTO } from './dto/create-plant.dto'
import type { UpdatePlantDTO } from './dto/update-plant.dto'
import type { CreatePlantGrowthLogDTO } from './dto/create-plant-growth.dto'
import { PlantGrowthLogDTOFactory } from './dto/plant-growth-log.dto.factory'

/**
 * Mock @CurrentUser decorator
 */
jest.mock('src/auth/decorators/current-user.decorator', () => ({
    CurrentUser: () => (_target: any, _key: string, index: number) => {
        Reflect.defineMetadata('custom:currentUserIndex', index, _target)
    },
}))

/**
 * Mock factory (controller responsibility is calling it)
 */
jest.mock('./dto/plant-growth-log.dto.factory', () => ({
    PlantGrowthLogDTOFactory: {
        createFromDTO: jest.fn(),
    },
}))

describe('PlantsController', () => {
    let controller: PlantsController
    let service: jest.Mocked<PlantsService>

    const userId = randomUUID()
    const plantId = randomUUID()
    const growthLogId = randomUUID()

    const user: CurrentUserContext = {
        id: userId,
        email: 'test@gmail.com',
    }

    beforeEach(async () => {
        const mockService: jest.Mocked<PlantsService> = {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            softDelete: jest.fn(),
            addGrowthLog: jest.fn(),
        } as any

        const module = await Test.createTestingModule({
            controllers: [PlantsController],
            providers: [
                {
                    provide: PlantsService,
                    useValue: mockService,
                },
            ],
        })
            .compile()

        controller = module.get(PlantsController)
        service = module.get(PlantsService)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should call findAll with user id and filters', async () => {
        const filters: PlantFiltersDTO = {
            page: 1,
            limit: 10,
        }

        const expectedResult = [{ id: plantId }]

        service.findAll.mockResolvedValue(expectedResult as any)

        const result = await controller.findAll(user, filters)

        expect(service.findAll).toHaveBeenCalledWith(userId, filters)
        expect(result).toEqual(expectedResult)
    })

    it('should call findOne with user id and plant id', async () => {
        const expectedResult = { id: plantId }

        service.findOne.mockResolvedValue(expectedResult as any)

        const result = await controller.findOne(user, plantId)

        expect(service.findOne).toHaveBeenCalledWith(userId, plantId)
        expect(result).toEqual(expectedResult)
    })

    it('should call create with user id and dto', async () => {
        const dto: CreatePlantDTO = {
            name: 'Plant A',
        } as any

        const expectedResult = { id: plantId }

        service.create.mockResolvedValue(expectedResult as any)

        const result = await controller.create(user, dto)

        expect(service.create).toHaveBeenCalledWith(userId, dto)
        expect(result).toEqual(expectedResult)
    })

    it('should call update with user id, plant id and dto', async () => {
        const dto: UpdatePlantDTO = {
            name: 'Updated Plant',
        } as any

        const expectedResult = { id: plantId }

        service.update.mockResolvedValue(expectedResult as any)

        const result = await controller.update(user, plantId, dto)

        expect(service.update).toHaveBeenCalledWith(userId, plantId, dto)
        expect(result).toEqual(expectedResult)
    })

    it('should call softDelete with user id and plant id', async () => {
        service.softDelete.mockResolvedValue(undefined)

        const result = await controller.remove(user, plantId)

        expect(service.softDelete).toHaveBeenCalledWith(userId, plantId)
        expect(result).toBeUndefined()
    })

    it('should create growth log domain dto and call service', async () => {
        const dto: CreatePlantGrowthLogDTO = {
            height: 20,
        } as any

        const domainDto = { height: 20, recordedAt: new Date() }

            ; (PlantGrowthLogDTOFactory.createFromDTO as jest.Mock).mockReturnValue(
                domainDto,
            )

        const expectedResult = { id: growthLogId }

        service.addGrowthLog.mockResolvedValue(expectedResult as any)

        const result = await controller.addGrowthLog(user, plantId, dto)

        expect(PlantGrowthLogDTOFactory.createFromDTO).toHaveBeenCalledWith(dto)
        expect(service.addGrowthLog).toHaveBeenCalledWith(
            userId,
            plantId,
            domainDto,
        )
        expect(result).toEqual(expectedResult)
    })
})
