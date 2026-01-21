import { Prisma, Seed } from '@prisma/client'
import { SeedFiltersDTO } from '../dto/seed-filter.dto'

export interface ISeedsRepository {
  findAll(
    userId: string,
    filters: SeedFiltersDTO,
  ): Promise<{ data: Seed[]; total: number }>
  findOne(userId: string, id: string): Promise<Seed | null>
  create(data: Prisma.SeedCreateInput): Promise<Seed>
  update(
    userId: string,
    id: string,
    data: Prisma.SeedUpdateInput,
  ): Promise<Seed>
  softDelete(userId: string, id: string): Promise<void>
}
