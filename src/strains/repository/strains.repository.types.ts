import { Strain } from '@prisma/client'

export type StrainWithPlantsHarvests = Strain & {
  plants?: Array<import('@prisma/client').Plant>
  harvests?: Array<import('@prisma/client').Harvest>
}
