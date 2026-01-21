import { Strain } from '@prisma/client'

export type StrainWithPlants = Strain & {
  plants: Array<import('@prisma/client').Plant>
}
