import { Plant, Prisma } from '@prisma/client'
import { PlantFiltersDTO } from '../dto/plant-filter.dto'
import { PlantWithStrainAndLogs } from '../repository/plants.repository.types'

export interface IPlantsRepository {
  findAll(
    userId: string,
    filters: PlantFiltersDTO,
  ): Promise<{ data: Plant[]; total: number }>
  findOne(userId: string, id: string): Promise<Plant | null>
  create(data: Prisma.PlantCreateInput): Promise<Plant>
  update(
    userId: string,
    id: string,
    data: Prisma.PlantUpdateInput,
  ): Promise<Plant>
  softDelete(userId: string, id: string): Promise<void>
  findByIdWithLastLog(
    userId: string,
    id: string,
  ): Promise<PlantWithStrainAndLogs | null>
}
