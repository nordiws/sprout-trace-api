import { Controller, Get } from '@nestjs/common';
import { HarvestTimelineEvent } from 'prisma/generated/enums';

@Controller('metadata')
export class MetadataController {

  @Get('harvest-timeline-events')
  getHarvestTimelineEvents() {
    return Object.values(HarvestTimelineEvent);
  }
  
}
