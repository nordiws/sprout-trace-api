import { PaginationDTO } from 'src/common/dto/pagination.dto'
import { SeedItemDTO } from './seed-item.dto'

export class SeedResponseDTO {
  pagination: PaginationDTO
  seeds: SeedItemDTO[]

  static mapper(
    seeds: SeedItemDTO[],
    pagination: PaginationDTO,
  ): SeedResponseDTO {
    return {
      pagination,
      seeds,
    }
  }
}
