import { Strain } from "prisma/generated/client";

export type StrainWithPlants = Strain & {
    plants: Array<import("prisma/generated/client").Plant>;
}