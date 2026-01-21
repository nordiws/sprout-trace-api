import { Injectable } from '@nestjs/common'
import { SeedsRepository } from './repository/seeds.repository'
import { PaginationDTO } from 'src/common/dto/pagination.dto'
import { SeedFiltersDTO } from './dto/seed-filter.dto'
import { SeedItemDTO } from './dto/seed-item.dto'
import { SeedResponseDTO } from './dto/seed-response.dto'
import { SeedDetailsDTO } from './dto/seed-details.dto'
import { SeedDTO } from './dto/seed.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class SeedsService {
  constructor(private readonly seedsRepository: SeedsRepository) {}

  async findAll(
    userId: string,
    filters: SeedFiltersDTO,
  ): Promise<SeedResponseDTO> {
    const { data, total } = await this.seedsRepository.findAll(userId, filters)
    const pagination = PaginationDTO.mapper(filters.page, filters.limit, total)
    return SeedResponseDTO.mapper(data.map(SeedItemDTO.fromEntity), pagination)
  }

  async findOne(userId: string, id: string): Promise<SeedDetailsDTO> {
    const seed = await this.seedsRepository.findByIdWithStrain(userId, id)
    if (!seed) {
      throw new Error('Seed not found')
    }
    return SeedDetailsDTO.fromEntity(seed)
  }

  async create(userId: string, dto: any): Promise<SeedDTO> {
    const seed = await this.seedsRepository.create(dto.toEntity(userId))
    return SeedDTO.fromEntity(seed)
  }

  async update(
    userId: string,
    id: string,
    dto: Prisma.SeedUpdateInput,
  ): Promise<SeedDTO> {
    const seed = await this.seedsRepository.update(userId, id, dto)
    return SeedDTO.fromEntity(seed)
  }

  async softDelete(userId: string, id: string): Promise<void> {
    await this.seedsRepository.softDelete(userId, id)
  }
}
