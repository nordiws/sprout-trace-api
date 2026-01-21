import { PaginationDTO } from 'src/common/dto/pagination.dto'
import { StrainItemDTO } from './strain-item.dto'

export class StrainResponseDTO {
  pagination: PaginationDTO
  strains: StrainItemDTO[]

  static mapper(
    strains: StrainItemDTO[],
    pagination: PaginationDTO,
  ): StrainResponseDTO {
    return {
      pagination,
      strains,
    }
  }
}
