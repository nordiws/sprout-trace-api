import { Module } from '@nestjs/common';
import { PlantsController } from './plants.controller';
import { PlantsRepository } from './repository/plants.repository';
import { PlantsService } from './plants.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
        imports: [PrismaModule],
        providers: [PlantsService, PlantsRepository],
        controllers: [PlantsController],
})
export class PlantsModule {}
