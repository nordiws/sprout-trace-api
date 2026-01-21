import { Test, TestingModule } from '@nestjs/testing'
import { MetadataController } from './metadata.controller'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { HarvestTimelineEvent } from '@prisma/client'

describe('MetadataController', () => {
  let controller: MetadataController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetadataController],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile()

    controller = module.get<MetadataController>(MetadataController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

    it('should return all HarvestTimelineEvent enum values', () => {
    const result = controller.getHarvestTimelineEvents()

    expect(Array.isArray(result)).toBe(true)
    expect(result).toEqual(Object.values(HarvestTimelineEvent))
  })
})
