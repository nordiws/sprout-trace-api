import { Injectable } from '@nestjs/common'
import { PlantsRepository } from './repository/plants.repository'
import { PlantDetailsDTO } from './dto/plant-details.dto'
import { PaginationDTO } from 'src/common/dto/pagination.dto'
import { PlantItemDTO } from './dto/plant-item.dto'
import { PlantDTO } from './dto/plant.dto'
import { PlantGrowthLogRepository } from './repository/plants-growth-log.repository'
import { PlantFiltersDTO } from './dto/plant-filter.dto'
import { PlantResponseDTO } from './dto/plant-response.dto'
import { PlantGrowthLogBaseDTO } from './dto/plant-growth-log-base.dto'
import { Prisma } from '@prisma/client'
import { UpdatePlantDTO } from './dto/update-plant.dto'

@Injectable()
export class PlantsService {
  constructor(
    private readonly plantsRepository: PlantsRepository,
    private readonly growthLogRepository: PlantGrowthLogRepository,
  ) {}

  async findAll(
    userId: string,
    filters: PlantFiltersDTO,
  ): Promise<PlantResponseDTO> {
    const { data, total } = await this.plantsRepository.findAll(userId, filters)
    const pagination = PaginationDTO.mapper(filters.page, filters.limit, total)
    return PlantResponseDTO.mapper(
      data.map(PlantItemDTO.fromEntity),
      pagination,
    )
  }

  async findOne(userId: string, id: string): Promise<PlantDetailsDTO> {
    const response = await this.plantsRepository.findByIdWithLastLog(userId, id)
    if (!response) {
      throw new Error('Plant not found')
    }
    return PlantDetailsDTO.fromEntity(response)
  }

  async create(userId: string, dto: any) {
    const plant = await this.plantsRepository.create(dto.toEntity(userId))
    return PlantDTO.fromEntity(plant)
  }

  async update(userId: string, id: string, dto: UpdatePlantDTO) {
    await this.getPlant(userId, id)
    const updatedPlant = await this.plantsRepository.update(userId, id, dto)
    return PlantDTO.fromEntity(updatedPlant)
  }

  async softDelete(userId: string, id: string) {
    await this.getPlant(userId, id)
    await this.plantsRepository.softDelete(userId, id)
  }

  async addGrowthLog(
    userId: string,
    plantId: string,
    dto: PlantGrowthLogBaseDTO,
  ) {
    await this.getPlant(userId, plantId)
    return this.growthLogRepository.addGrowthLog(
      dto.toPrismaCreateInput(plantId),
    )
  }

  private async getPlant(userId: string, id: string) {
    const plant = await this.plantsRepository.findOne(userId, id)
    if (!plant) {
      throw new Error('Plant not found')
    }
    return plant
  }
}
