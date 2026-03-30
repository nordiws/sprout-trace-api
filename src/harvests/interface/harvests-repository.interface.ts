import { Harvest, Prisma } from '@prisma/client'
import { HarvestFiltersDTO } from '../dto/harvest-filter.dto'
import { HarvestWithPlantsStrainsTimeline, HarvestWithPlantsTimeline } from '../repository/harvests.repository.types';

export interface IHarvestsRepository {
  findAll(
    userId: string,
    filters: HarvestFiltersDTO,
  ): Promise<{ data: HarvestWithPlantsTimeline[]; total: number }>
  findOne(userId: string, id: string): Promise<Harvest | null>
  findByIdWithPlantsStrainsTimeline(userId: string, id: string): Promise<HarvestWithPlantsStrainsTimeline | null> 
  create(data: Prisma.HarvestCreateInput): Promise<HarvestWithPlantsStrainsTimeline>
  update(id: string, data: Harvest): Promise<HarvestWithPlantsStrainsTimeline>
  softDelete(userId: string, id: string): Promise<void>
}
