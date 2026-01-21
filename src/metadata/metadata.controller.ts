import { Controller, Get, UseGuards } from '@nestjs/common'
import { HarvestTimelineEvent } from '@prisma/client'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('metadata')
@UseGuards(JwtAuthGuard)
export class MetadataController {
  @Get('harvest-timeline-events')
  getHarvestTimelineEvents() {
    return Object.values(HarvestTimelineEvent)
  }
}
