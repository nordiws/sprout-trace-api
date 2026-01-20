import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SeedsService } from './seeds.service';
import { SeedsRepository } from './repository/seeds.repository';
import { SeedsController } from './seeds.controller';

@Module({
    imports: [PrismaModule],
    providers: [SeedsService, SeedsRepository],
    controllers: [SeedsController],
})
export class SeedsModule {}
