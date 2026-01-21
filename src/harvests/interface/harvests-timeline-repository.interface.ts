import { Prisma } from '@prisma/client'

export interface IHarvestsTimelineRepository {
  addEvent(data: Prisma.HarvestTimelineCreateInput): Promise<any>
}
