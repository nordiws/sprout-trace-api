import { Module } from '@nestjs/common'
import { StrainsController } from './strains.controller'
import { StrainsService } from './strains.service'
import { StrainsRepository } from './repository/strains.repository'

@Module({
  providers: [StrainsService, StrainsRepository],
  controllers: [StrainsController],
})
export class StrainsModule {}
