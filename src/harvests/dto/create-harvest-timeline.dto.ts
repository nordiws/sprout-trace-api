import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { HarvestTimeline, Prisma } from "prisma/generated/client";
import { HarvestTimelineEvent } from "prisma/generated/enums";

export class CreateHarvestTimelineDTO {

  @IsDateString()
  date: string;

  @IsEnum(HarvestTimelineEvent)
  event: HarvestTimelineEvent;

  @IsOptional()
  @IsString()
  description?: string;

  toEntity(harvestId: string): Prisma.HarvestTimelineCreateInput {
    return {
      date: new Date(this.date),
      event: this.event,
      description: this.description || null,
      harvest: {
        connect: { id: harvestId }
      }
    };
  }

}
