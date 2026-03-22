import { PaginationDTO } from 'src/common/dto/pagination.dto'
import { PlantDTO } from './plant.dto'

export class PlantResponseDTO {
  pagination: PaginationDTO
  data: PlantDTO[]

  static mapper(
    plants: PlantDTO[],
    pagination: PaginationDTO,
  ): PlantResponseDTO {
    return {
      pagination,
      data: plants,
    }
  }
}
