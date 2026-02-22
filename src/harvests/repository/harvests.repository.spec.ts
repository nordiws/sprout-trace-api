import { HarvestsRepository } from './harvests.repository'

type PrismaMock = {
  harvest: {
    count: jest.Mock
    findMany: jest.Mock
    findFirst: jest.Mock
    create: jest.Mock
    update: jest.Mock
  }
  $transaction: jest.Mock
}

describe('HarvestsRepository', () => {
  let repo: HarvestsRepository
  let prisma: PrismaMock

  beforeEach(() => {
    prisma = {
      harvest: {
        count: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      $transaction: jest.fn(),
    }

    repo = new HarvestsRepository(prisma as any)
  })

  describe('findAll', () => {
    it('should query with default pagination', async () => {
      prisma.$transaction.mockResolvedValue([5, [{ id: 'h1' }]] as any)

      const result = await repo.findAll('user-1', {} as any)

      expect(prisma.$transaction).toHaveBeenCalled()

      const calls = prisma.$transaction.mock.calls[0][0]
      const countCall = calls[0]
      const findCall = calls[1]

      expect(countCall).toEqual(
        prisma.harvest.count({
          where: { userId: 'user-1', active: true },
        }),
      )

      expect(findCall).toEqual(
        prisma.harvest.findMany(
          expect.objectContaining({
            where: { userId: 'user-1', active: true },
            skip: 0,
            take: 10,
          }),
        ),
      )

      expect(result).toEqual({
        total: 5,
        data: [{ id: 'h1' }],
      })
    })

    it('should apply pagination correctly', async () => {
      prisma.$transaction.mockResolvedValue([0, []] as any)

      await repo.findAll('user-1', { page: 3, limit: 20 } as any)

      expect(prisma.harvest.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 40,
          take: 20,
        }),
      )
    })

    it('should apply filters correctly', async () => {
      prisma.$transaction.mockResolvedValue([0, []] as any)

      await repo.findAll('user-1', {
        status: 'DONE',
        harvestType: 'INDOOR',
        search: 'weed',
      } as any)

      expect(prisma.harvest.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            userId: 'user-1',
            active: true,
            status: 'DONE',
            harvestType: 'INDOOR',
            OR: [
              { name: { contains: 'weed', mode: 'insensitive' } },
              { notes: { contains: 'weed', mode: 'insensitive' } },
            ],
          }),
        }),
      )
    })
  })

  describe('findOne', () => {
    it('should find harvest by id and user', async () => {
      prisma.harvest.findFirst.mockResolvedValue({ id: 'h1' } as any)

      const result = await repo.findOne('user-1', 'h1')

      expect(prisma.harvest.findFirst).toHaveBeenCalledWith({
        where: {
          id: 'h1',
          userId: 'user-1',
          active: true,
        },
      })

      expect(result).toEqual({ id: 'h1' })
    })
  })

  describe('create', () => {
    it('should create harvest', async () => {
      const data = { name: 'harvest' } as any
      prisma.harvest.create.mockResolvedValue({ id: 'h1' } as any)

      const result = await repo.create(data)

      expect(prisma.harvest.create).toHaveBeenCalledWith({ data })
      expect(result).toEqual({ id: 'h1' })
    })
  })

  describe('update', () => {
    it('should update harvest', async () => {
      prisma.harvest.update.mockResolvedValue({ id: 'h1' } as any)

      const result = await repo.update('h1', { name: 'updated' } as any)

      expect(prisma.harvest.update).toHaveBeenCalledWith({
        where: { id: 'h1', active: true },
        data: { name: 'updated' },
      })

      expect(result).toEqual({ id: 'h1' })
    })
  })

  describe('softDelete', () => {
    it('should soft delete harvest', async () => {
      prisma.harvest.update.mockResolvedValue({} as any)

      await repo.softDelete('user-1', 'h1')

      expect(prisma.harvest.update).toHaveBeenCalledWith({
        where: { id: 'h1', userId: 'user-1', active: true },
        data: { active: false },
      })
    })
  })
})
