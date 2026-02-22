import { PlantGrowthLogRepository } from './plants-growth-log.repository'

type PrismaMock = {
  plantGrowthLog: {
    create: jest.Mock
  }
}

describe('PlantGrowthLogRepository', () => {
  let repo: PlantGrowthLogRepository
  let prisma: PrismaMock

  beforeEach(() => {
    prisma = {
      plantGrowthLog: {
        create: jest.fn(),
      },
    }

    repo = new PlantGrowthLogRepository(prisma as any)
  })

  describe('addGrowthLog', () => {
    it('should create growth log', async () => {
      const data = {
        plant: { connect: { id: 'plant-1' } },
        type: 'MEASUREMENT',
      } as any

      prisma.plantGrowthLog.create.mockResolvedValue({ id: 'log-1' })

      const result = await repo.addGrowthLog(data)

      expect(prisma.plantGrowthLog.create).toHaveBeenCalledWith({
        data,
      })

      expect(result).toEqual({ id: 'log-1' })
    })

    it('should propagate prisma result', async () => {
      const created = {
        id: 'log-99',
        type: 'NUTRIENTS',
      }

      prisma.plantGrowthLog.create.mockResolvedValue(created as any)

      const result = await repo.addGrowthLog({} as any)

      expect(result).toBe(created)
    })
  })
})
