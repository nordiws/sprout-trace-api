import { PaginationDTO } from 'src/common/dto/pagination.dto'
import { StrainItemDTO } from './strain-item.dto'

export class StrainResponseDTO {
  pagination: PaginationDTO
  data: StrainItemDTO[]

  static mapper(
    strains: StrainItemDTO[],
    pagination: PaginationDTO,
  ): StrainResponseDTO {
    return {
      pagination,
      data: strains,
    }
  }
}
