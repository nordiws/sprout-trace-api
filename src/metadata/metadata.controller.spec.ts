import { Test, TestingModule } from '@nestjs/testing'
import { MetadataController } from './metadata.controller'
import { HarvestTimelineEvent } from '@prisma/client'

describe('MetadataController', () => {
  let controller: MetadataController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetadataController],
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
