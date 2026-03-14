import { PaginationDTO } from 'src/common/dto/pagination.dto'
import { PlantItemDTO } from './plant-item.dto'

export class PlantResponseDTO {
  pagination: PaginationDTO
  data: PlantItemDTO[]

  static mapper(
    plants: PlantItemDTO[],
    pagination: PaginationDTO,
  ): PlantResponseDTO {
    return {
      pagination,
      data: plants,
    }
  }
}
