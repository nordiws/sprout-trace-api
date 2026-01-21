import { HarvestTimeline, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { IHarvestsTimelineRepository } from '../interface/harvests-timeline-repository.interface'

export class HarvestTimelineRepository implements IHarvestsTimelineRepository {
  constructor(private readonly prisma: PrismaService) {}

  addEvent(data: Prisma.HarvestTimelineCreateInput): Promise<HarvestTimeline> {
    return this.prisma.harvestTimeline.create({ data })
  }
}
