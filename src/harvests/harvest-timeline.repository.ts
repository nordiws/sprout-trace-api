import { HarvestTimeline, Prisma } from "prisma/generated/client";
import { IHarvestTimelineRepository } from "./interface/harvest-timeline-repository.interface";
import { PrismaService } from "src/prisma/prisma.service";

export class HarvestTimelineRepository implements IHarvestTimelineRepository {
    
    constructor(private readonly prisma: PrismaService) { }

    async addEvent(data: Prisma.HarvestTimelineCreateInput): Promise<HarvestTimeline> {
        return this.prisma.harvestTimeline.create({data});
    }
    
}