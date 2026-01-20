import { IPlantGrowthLogDTO } from "../interface/plant-groth-log.dto.interface";
import { CreatePlantGrowthLogDTO } from "./create-plant-growth.dto";
import { MeasurementGrowthLogDTO } from "./measurement-growth-log.dto";
import { NutrientGrowthLogDTO } from "./nutrient-growth-log.dto";
import { PestGrowthLogDTO } from "./pest-growth-log.dto";
import { PlantGrowthLogBaseDTO } from "./plant-growth-log-base.dto";
import { TrainingGrowthLogDTO } from "./training-growth-log.dto";
import { TreatmentGrowthLogDTO } from "./treatment-growth-log.dto";

export class PlantGrowthLogDTOFactory {
  static createFromDTO(
    dto: CreatePlantGrowthLogDTO
  ): PlantGrowthLogBaseDTO {
    switch (dto.type) {
      case "MEASUREMENT":
        return Object.assign(new MeasurementGrowthLogDTO(), {
          ...dto,
          measurement: dto.measurementLog,
        });

      case "NUTRIENTS":
        return Object.assign(new NutrientGrowthLogDTO(), {
          ...dto,
          nutrient: dto.nutrientLog,
        });

      case "PEST_ISSUE":
        return Object.assign(new PestGrowthLogDTO(), {
          ...dto,
          pest: dto.pestLog,
        });

      case "TRAINING":
        return Object.assign(new TrainingGrowthLogDTO(), {
          ...dto,
          training: dto.trainingLog,
        });

      case "SPECIAL_TREATMENT":
        return Object.assign(new TreatmentGrowthLogDTO(), {
          ...dto,
          treatment: dto.treatmentLog,
        });

      default:
        throw new Error("Unsupported growth log type");
    }
  }
}
