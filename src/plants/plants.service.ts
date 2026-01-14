import { Injectable } from "@nestjs/common";
import { PlantRepository } from "./plant.repository";

@Injectable()
export class PlantsService {

    constructor(
        private readonly plantRepository: PlantRepository
    ) {}

    findAll(userId: string, filters: any) {
        // Implementation here
    }
    findOne(userId: string, id: string) {
        // Implementation here
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
        const plant = await this.plantRepository.findOne(id);
        if (!plant) {
            throw new Error('Plant not found');
        }
        return plant;
    }

}