import { Seed, Strain } from '@prisma/client'

export type SeedWithStrain = Seed & {
  strain: Strain
}
