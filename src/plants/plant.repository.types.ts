import { Strain, Plant } from "prisma/generated/client"

export type PlantWithStrain = Plant & {
  strain: Strain;
}