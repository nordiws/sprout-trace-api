import { PaginationDTO } from "src/common/dto/pagination.dto";
import { PlantItemDTO } from "./plant-item.dto";

export class PlantResponseDTO{

    pagination: PaginationDTO
    plants: PlantItemDTO[]

    static mapper(plants: PlantItemDTO[], pagination: PaginationDTO): PlantResponseDTO {
        return {
            pagination,
            plants
        }
    }

}