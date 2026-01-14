import { Module } from '@nestjs/common';
import { HarvestsController } from './harvests.controller';
import { HarvestService } from './harvests.service';
import { HarvestRepository } from './repository/harvest.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HarvestTimelineRepository } from './repository/harvest-timeline.repository';

@Module({
    imports: [PrismaModule],
    controllers: [HarvestsController],
    providers: [HarvestService, HarvestRepository, HarvestTimelineRepository]
})
export class HarvestsModule {}
