import { PaginationDTO } from 'src/common/dto/pagination.dto'
import { HarvestDTO } from './harvest.dto'

export class HarvestResponseDTO {
  pagination: PaginationDTO
  data: HarvestDTO[]

  static mapper(
    harvests: HarvestDTO[],
    pagination: PaginationDTO,
  ): HarvestResponseDTO {
    return {
      pagination,
      data: harvests,
    }
  }
}
