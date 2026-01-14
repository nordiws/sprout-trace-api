import { Module } from '@nestjs/common';
import { HarvestsController } from './harvests.controller';
import { HarvestService } from './harvest.service';
import { HarvestRepository } from './harvest.repository';
import { HarvestTimelineRepository } from './harvest-timeline.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [HarvestsController],
    providers: [HarvestService, HarvestRepository, HarvestTimelineRepository]
})
export class HarvestsModule {}
