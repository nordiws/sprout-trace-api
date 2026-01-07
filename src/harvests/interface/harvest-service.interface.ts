import { CreateHarvestDTO } from "../dto/create-harvest.dto"
import { HarvestDetailsDTO } from "../dto/harvest-details.dto"
import { HarvestFiltersDTO } from "../dto/harvest-filter.dto"
import { HarvestResponseDTO } from "../dto/harvest-response.dto"
import { UpdateHarvestDTO } from "../dto/update-harvest.dto"

export interface IHarvestService {
    findAll(userId: string, filters: HarvestFiltersDTO): Promise<HarvestResponseDTO>
    findOne(userId: string, id: string): Promise<HarvestDetailsDTO>
    create(userId: string, data: CreateHarvestDTO): Promise<HarvestDetailsDTO>
    update(userId: string, id: string, data: UpdateHarvestDTO): Promise<HarvestDetailsDTO>
    softDelete(userId: string, id: string): Promise<void>
}