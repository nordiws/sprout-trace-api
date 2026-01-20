import { PaginationDTO } from "src/common/dto/pagination.dto"
import { StrainFiltersDTO } from "./dto/strain-filter.dto"
import { StrainResponseDTO } from "./dto/strain-response.dto"
import { StrainDTO } from "./dto/strain.dto"
import { StrainsRepository } from "./repository/strains.repository"
import { CreateStrainDTO } from "./dto/create-strain.dto"
import { UpdateStrainDTO } from "./dto/update-strain.dto"
import { StrainDetailsDTO } from "./dto/strain-details.dto"
import { Strain } from "prisma/generated/client"

export class StrainsService {

    constructor(private readonly strainsRepository: StrainsRepository) {}

    async findAll(userId: string, filters: StrainFiltersDTO): Promise<StrainResponseDTO> {
        const { total, data } = await this.strainsRepository.findAll(userId, filters)

        const pagination = PaginationDTO.mapper(
            filters.page,
            filters.limit,
            total
        )

        return StrainResponseDTO.mapper(
            data.map(StrainDTO.fromEntity), 
            pagination
        )
    }

    async findOne(userId: string, id: string) {
        const strain = await this.strainsRepository.findByIdWithPlants(userId, id)
        if (!strain) {
            throw new Error('Strain not found')
        }
        return StrainDetailsDTO.fromEntity(strain)
    }

    async create(userId: string, dto: CreateStrainDTO) {
        const strain = await this.strainsRepository.create(dto.toEntity(userId))
        return StrainDTO.fromEntity(strain)
    }
    
    async update(userId: string, id: string, dto: UpdateStrainDTO) {
        await this.getStrain(userId, id)
        const updatedStrain = await this.strainsRepository.update(userId, id, dto)
        return StrainDTO.fromEntity(updatedStrain)
    }

    async softDelete(userId: string, id: string) {
        await this.getStrain(userId, id)
        await this.strainsRepository.softDelete(userId, id)
    }

    private async getStrain(userId: string, id: string): Promise<Strain> {
        const strain = await this.strainsRepository.findOne(userId, id)
        if (!strain) {
            throw new Error('Strain not found')
        }
        return strain
    }

}