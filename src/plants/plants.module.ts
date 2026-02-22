import { Module } from '@nestjs/common'
import { PlantsController } from './plants.controller'
import { PlantsRepository } from './repository/plants.repository'
import { PlantsService } from './plants.service'
import { PlantGrowthLogRepository } from './repository/plants-growth-log.repository'

@Module({
  providers: [PlantsService, PlantsRepository, PlantGrowthLogRepository],
  controllers: [PlantsController],
})
export class PlantsModule {}
