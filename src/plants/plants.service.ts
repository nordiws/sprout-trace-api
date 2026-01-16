import { Injectable } from "@nestjs/common";
import { PlantsRepository } from "./repository/plants.repository";
import { PlantDetailsDTO } from "./dto/plant-details.dto";

@Injectable()
export class PlantsService {

    constructor(
        private readonly plantsRepository: PlantsRepository
    ) {}

    findAll(userId: string, filters: any) {
        // Implementation here
    }
    async findOne(userId: string, id: string) {
        const response = await this.plantsRepository.findByIdWithLastLog(userId, id);
        if (!response) {
            throw new Error('Plant not found');
        }
        return PlantDetailsDTO.fromEntity(response);
    }
    create(userId: string, dto: any) {
        // Implementation here
    }
    update(userId: string, id: string, dto: any) {
        // Implementation here
    }
    remove(userId: string, id: string) {
        // Implementation here
    }
    addGrowthLog(userId: string, plantId: string, dto: any) {
        // Implementation here
    }

    private async getPlant(userId: string, id: string) {
        const plant = await this.plantsRepository.findOne(id);
        if (!plant) {
            throw new Error('Plant not found');
        }
        return plant;
    }

}