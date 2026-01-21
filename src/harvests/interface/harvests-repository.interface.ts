import { Harvest, Prisma } from '@prisma/client'
import { HarvestFiltersDTO } from '../dto/harvest-filter.dto'

export interface IHarvestsRepository {
  findAll(
    userId: string,
    filters: HarvestFiltersDTO,
  ): Promise<{ data: Harvest[]; total: number }>
  findOne(userId: string, id: string): Promise<Harvest | null>
  create(data: Prisma.HarvestCreateInput): Promise<Harvest>
  update(id: string, data: Harvest): Promise<Harvest>
  softDelete(userId: string, id: string): Promise<void>
}
