import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { HarvestTimelineEvent } from "prisma/generated/enums";

export class CreateHarvestTimelineDTO {
  @IsDateString()
  date: string;

  @IsEnum(HarvestTimelineEvent)
  event: HarvestTimelineEvent;

  @IsOptional()
  @IsString()
  description?: string;
}
