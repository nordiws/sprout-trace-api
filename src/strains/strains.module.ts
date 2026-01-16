import { Module } from '@nestjs/common';
import { StrainsController } from './strains.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [StrainsService, StrainRepository],
    controllers: [StrainsController],
})
export class StrainsModule { }
