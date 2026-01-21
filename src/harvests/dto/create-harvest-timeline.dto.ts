import { HarvestTimelineEvent, Prisma } from '@prisma/client'
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator'

export class CreateHarvestTimelineDTO {
  @IsDateString()
  date: string

  @IsEnum(HarvestTimelineEvent)
  event: HarvestTimelineEvent

  @IsOptional()
  @IsString()
  description?: string

  toEntity(harvestId: string): Prisma.HarvestTimelineCreateInput {
    return {
      date: new Date(this.date),
      event: this.event,
      description: this.description || null,
      harvest: {
        connect: { id: harvestId },
      },
    }
  }
}
