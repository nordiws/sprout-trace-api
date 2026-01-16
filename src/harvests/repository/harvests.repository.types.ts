import { Harvest, Plant } from "prisma/generated/client";

export type HarvestWithPlants = Harvest & {
  plants: Plant[];
};
