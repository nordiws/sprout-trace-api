import { PlantsRepository } from './plants.repository'

type PrismaMock = {
  plant: {
    count: jest.Mock
    findMany: jest.Mock
    findFirst: jest.Mock
    findUnique: jest.Mock
    create: jest.Mock
    update: jest.Mock
  }
  $transaction: jest.Mock
}

describe('PlantsRepository', () => {
  let repo: PlantsRepository
  let prisma: PrismaMock

  beforeEach(() => {
    prisma = {
      plant: {
        count: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      $transaction: jest.fn(),
    }

    repo = new PlantsRepository(prisma as any)
  })

  describe('findAll', () => {
    it('should use default pagination', async () => {
      prisma.$transaction.mockResolvedValue([5, [{ id: 'p1' }]])

      const result = await repo.findAll('user-1', {} as any)

      expect(prisma.plant.count).toHaveBeenCalledWith({
        where: { userId: 'user-1', active: true },
      })

      expect(prisma.plant.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: 'user-1', active: true },
          skip: 0,
          take: 10,
          orderBy: { createdAt: 'desc' },
        }),
      )

      expect(result).toEqual({
        total: 5,
        data: [{ id: 'p1' }],
      })
    })

    it('should apply pagination correctly', async () => {
      prisma.$transaction.mockResolvedValue([0, []])

      await repo.findAll('user-1', { page: 3, limit: 20 } as any)

      expect(prisma.plant.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 40,
          take: 20,
        }),
      )
    })

    it('should apply filters correctly', async () => {
      prisma.$transaction.mockResolvedValue([0, []])

      await repo.findAll('user-1', {
        status: 'VEG',
        health: 'HEALTHY',
        strainId: 'strain-1',
        harvestId: 'harvest-1',
        search: 'room',
      } as any)

      expect(prisma.plant.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            userId: 'user-1',
            active: true,
            status: 'VEG',
            health: 'HEALTHY',
            strainId: 'strain-1',
            harvestId: 'harvest-1',
            OR: [
              { code: { contains: 'room', mode: 'insensitive' } },
              { notes: { contains: 'room', mode: 'insensitive' } },
              { location: { contains: 'room', mode: 'insensitive' } },
            ],
          }),
        }),
      )
    })
  })

  describe('findOne', () => {
    it('should find plant by id and user', async () => {
      prisma.plant.findFirst.mockResolvedValue({ id: 'p1' })

      const result = await repo.findOne('user-1', 'p1')

      expect(prisma.plant.findFirst).toHaveBeenCalledWith({
        where: {
          id: 'p1',
          userId: 'user-1',
          active: true,
        },
      })

      expect(result).toEqual({ id: 'p1' })
    })
  })

  describe('create', () => {
    it('should create plant', async () => {
      const data = { code: 'P001' } as any
      prisma.plant.create.mockResolvedValue({ id: 'p1' })

      const result = await repo.create(data)

      expect(prisma.plant.create).toHaveBeenCalledWith({ data })
      expect(result).toEqual({ id: 'p1' })
    })
  })

  describe('update', () => {
    it('should update plant scoped by user', async () => {
      prisma.plant.update.mockResolvedValue({ id: 'p1' })

      const result = await repo.update('user-1', 'p1', { code: 'P002' } as any)

      expect(prisma.plant.update).toHaveBeenCalledWith({
        where: {
          id: 'p1',
          userId: 'user-1',
          active: true,
        },
        data: { code: 'P002' },
      })

      expect(result).toEqual({ id: 'p1' })
    })
  })

  describe('softDelete', () => {
    it('should soft delete plant', async () => {
      prisma.plant.update.mockResolvedValue({})

      await repo.softDelete('user-1', 'p1')

      expect(prisma.plant.update).toHaveBeenCalledWith({
        where: {
          id: 'p1',
          userId: 'user-1',
          active: true,
        },
        data: { active: false },
      })
    })
  })

  describe('findByIdWithLastLog', () => {
    it('should include strain and last growth log', async () => {
      prisma.plant.findUnique.mockResolvedValue({ id: 'p1' })

      const result = await repo.findByIdWithLastLog('user-1', 'p1')

      expect(prisma.plant.findUnique).toHaveBeenCalledWith({
        where: { id: 'p1', userId: 'user-1', active: true },
        include: {
          strain: true,
          growthLogs: {
            orderBy: { date: 'desc' },
            take: 1,
          },
        },
      })

      expect(result).toEqual({ id: 'p1' })
    })
  })
})
