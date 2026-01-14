import { HarvestTimeline, Prisma } from "prisma/generated/client";

export interface IHarvestTimelineRepository {
    addEvent(data: Prisma.HarvestTimelineCreateInput): Promise<any>
}