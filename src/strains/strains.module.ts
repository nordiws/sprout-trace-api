import { Module } from '@nestjs/common'
import { StrainsController } from './strains.controller'
import { StrainsService } from './strains.service'
import { StrainsRepository } from './repository/strains.repository'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [StrainsService, StrainsRepository],
  controllers: [StrainsController],
})
export class StrainsModule {}
