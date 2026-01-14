import { Injectable, NotFoundException } from "@nestjs/common"
import { HarvestRepository } from "./harvest.repository"
import { CreateHarvestDTO } from "./dto/create-harvest.dto"
import { HarvestDetailsDTO } from "./dto/harvest-details.dto"
import { HarvestFiltersDTO } from "./dto/harvest-filter.dto"
import { HarvestResponseDTO } from "./dto/harvest-response.dto"
import { UpdateHarvestDTO } from "./dto/update-harvest.dto"
import { PaginationDTO } from "src/common/dto/pagination.dto"
import { HarvestDTO } from "./dto/harvest.dto"
import { CreateHarvestTimelineDTO } from "./dto/create-harvest-timeline.dto"
import { Harvest, HarvestTimelineEvent } from "prisma/generated/client"
import { HarvestTimelineRepository } from "./harvest-timeline.repository"


@Injectable()
export class HarvestService {

    constructor(
        private readonly harvestRepository: HarvestRepository,
        private readonly harvestTimelineRepository: HarvestTimelineRepository
    ) { }

    async findAll(
        userId: string,
        filters: HarvestFiltersDTO
    ): Promise<HarvestResponseDTO> {

        const { total, data } =
            await this.harvestRepository.findAll(userId, filters)

        const pagination = PaginationDTO.mapper(
            filters.page,
            filters.limit,
            total
        )

        return HarvestResponseDTO.mapper(
            data.map(HarvestDTO.fromEntity),
            pagination
        )
    }

    async findOne(userId: string, id: string): Promise<HarvestDetailsDTO> {
        const harvest = await this.getHarvest(userId, id)
        return HarvestDetailsDTO.fromEntity(harvest)
    }

    async create(userId: string, data: CreateHarvestDTO): Promise<HarvestDetailsDTO> {
        const createdHarvest = await this.harvestRepository.create(data.toEntity(userId))
        return HarvestDetailsDTO.fromEntity(createdHarvest)
    }

    async update(userId: string, id: string, data: UpdateHarvestDTO): Promise<HarvestDetailsDTO> {
        await this.getHarvest(userId, id)
        const updatedHarvest = await this.harvestRepository.update(id, data)
        return HarvestDetailsDTO.fromEntity(updatedHarvest)
    }

    async softDelete(userId: string, id: string): Promise<void> {
        await this.getHarvest(userId, id)
        await this.harvestRepository.softDelete(userId, id)
    }

    async addTimelineEvent(userId: string, harvestId: string, data: CreateHarvestTimelineDTO) {
        const harvest = await this.getHarvest(userId, harvestId)
        return this.harvestTimelineRepository.addEvent(data.toEntity(harvest.id))
    }
    
    private async getHarvest(
        userId: string,
        id: string
    ): Promise<Harvest> {
        const harvest = await this.harvestRepository.findOne(userId, id)
        if (!harvest) {
            throw new NotFoundException(`Harvest with ID ${id} not found`);
        }
        return harvest
    }

}