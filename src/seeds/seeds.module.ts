import { Module } from '@nestjs/common'
import { SeedsService } from './seeds.service'
import { SeedsRepository } from './repository/seeds.repository'
import { SeedsController } from './seeds.controller'

@Module({
  providers: [SeedsService, SeedsRepository],
  controllers: [SeedsController],
})
export class SeedsModule {}
