import { Prisma } from "prisma/generated/client";

export interface IHarvestsTimelineRepository {
    addEvent(data: Prisma.HarvestTimelineCreateInput): Promise<any>
}