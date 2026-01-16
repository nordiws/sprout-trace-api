import { Module } from '@nestjs/common';
import { HarvestsController } from './harvests.controller';
import { HarvestsService } from './harvests.service';
import { HarvestsRepository } from './repository/harvests.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HarvestTimelineRepository } from './repository/harvests-timeline.repository';

@Module({
    imports: [PrismaModule],
    controllers: [HarvestsController],
    providers: [HarvestsService, HarvestsRepository, HarvestTimelineRepository]
})
export class HarvestsModule {}
