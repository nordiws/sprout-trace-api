import { Module } from '@nestjs/common'
import { HarvestsController } from './harvests.controller'
import { HarvestsService } from './harvests.service'
import { HarvestsRepository } from './repository/harvests.repository'
import { HarvestTimelineRepository } from './repository/harvests-timeline.repository'

@Module({
  controllers: [HarvestsController],
  providers: [HarvestsService, HarvestsRepository, HarvestTimelineRepository],
})
export class HarvestsModule {}
