import { Injectable } from "@nestjs/common";
import { IHarvestService } from "./interface/harvest-service.interface";
import { HarvestRepository } from "./harvest.repository";
import { CreateHarvestDTO } from "./dto/create-harvest.dto";
import { HarvestDetailsDTO } from "./dto/harvest-details.dto";
import { HarvestFiltersDTO } from "./dto/harvest-filter.dto";
import { HarvestResponseDTO } from "./dto/harvest-response.dto";
import { UpdateHarvestDTO } from "./dto/update-harvest.dto";
import { PaginationDTO } from "src/common/dto/pagination.dto";
import { HarvestDTO } from "./dto/harvest.dto";
import { CreateHarvestTimelineDTO } from "./dto/create-harvest-timeline.dto";


@Injectable()
export class HarvestService implements IHarvestService {

    constructor(private readonly harvestRepository: HarvestRepository) { }

    async findAll(
        userId: string,
        filters: HarvestFiltersDTO
    ): Promise<HarvestResponseDTO> {

        const { total, data } =
            await this.harvestRepository.findAll(userId, filters);

        const pagination = PaginationDTO.mapper(
            filters.page,
            filters.limit,
            total
        );

        return HarvestResponseDTO.mapper(
            data.map(HarvestDTO.fromEntity),
            pagination
        );
    }

    findOne(userId: string, id: string): Promise<HarvestDetailsDTO> {
        throw new Error("Method not implemented.");
    }
    create(userId: string, data: CreateHarvestDTO): Promise<HarvestDetailsDTO> {
        throw new Error("Method not implemented.");
    }
    update(userId: string, id: string, data: UpdateHarvestDTO): Promise<HarvestDetailsDTO> {
        throw new Error("Method not implemented.");
    }
    softDelete(userId: string, id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    addTimelineEvent(userId: string, harvestId: string, dto: CreateHarvestTimelineDTO){
        throw new Error("Method not implemented.");
    }

}