import { Seed, Strain } from "prisma/generated/client";


export type SeedWithStrain = Seed & {
  strain: Strain;
}
