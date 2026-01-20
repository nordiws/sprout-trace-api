import { Injectable } from "@nestjs/common"
import { SeedsRepository } from "./repository/seeds.repository"
import { PaginationDTO } from "src/common/dto/pagination.dto"
import { SeedFiltersDTO } from "./dto/seed-filter.dto"
import { SeedItemDTO } from "./dto/seed-item.dto"
import { SeedResponseDTO } from "./dto/seed-response.dto"
import { SeedDetailsDTO } from "./dto/seed-details.dto"

@Injectable()
export class SeedsService {

    constructor(
        private readonly seedsRepository: SeedsRepository
    ) { }

    async findAll(userId: string, filters: SeedFiltersDTO): Promise<SeedResponseDTO> {
        const { data, total } = await this.seedsRepository.findAll(userId, filters)
        const pagination = PaginationDTO.mapper(
            filters.page,
            filters.limit,
            total
        )
        return SeedResponseDTO.mapper(
            data.map(SeedItemDTO.fromEntity),
            pagination
        )
    }
    async findOne(userId: string, id: string): Promise<SeedDetailsDTO> {
        const seed = await this.seedsRepository.findOne(userId, id)
        if (!seed) {
            throw new Error('Seed not found')
        }
        return SeedDetailsDTO.fromEntity(seed)
    }
    create(userId: string, dto: any) {}
    update(userId: string, id: string, dto: any) {}
    softDelete(userId: string, id: string) {}

}