import { PaginationDTO } from "src/common/dto/pagination.dto";
import { StrainDTO } from "./strain.dto";

export class StrainResponseDTO {

  pagination: PaginationDTO
  strains: StrainDTO[]

  static mapper(strains: StrainDTO[], pagination: PaginationDTO): StrainResponseDTO {
    return {
      pagination,
      strains
    }
  }

}
