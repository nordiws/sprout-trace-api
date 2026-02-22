import { SeedsRepository } from './seeds.repository'

type PrismaMock = {
  seed: {
    count: jest.Mock
    findMany: jest.Mock
    findFirst: jest.Mock
    findUnique: jest.Mock
    create: jest.Mock
    update: jest.Mock
  }
  $transaction: jest.Mock
}

describe('SeedsRepository', () => {
  let repo: SeedsRepository
  let prisma: PrismaMock

  beforeEach(() => {
    prisma = {
      seed: {
        count: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      $transaction: jest.fn(),
    }

    repo = new SeedsRepository(prisma as any)
  })

  describe('findAll', () => {
    it('should use default pagination', async () => {
      prisma.$transaction.mockResolvedValue([5, [{ id: 's1' }]])

      const result = await repo.findAll('user-1', {} as any)

      expect(prisma.seed.count).toHaveBeenCalledWith({
        where: { userId: 'user-1', active: true },
      })

      expect(prisma.seed.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: 'user-1', active: true },
          skip: 0,
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: { strain: true },
        }),
      )

      expect(result).toEqual({
        total: 5,
        data: [{ id: 's1' }],
      })
    })

    it('should apply pagination correctly', async () => {
      prisma.$transaction.mockResolvedValue([0, []])

      await repo.findAll('user-1', { page: 4, limit: 25 } as any)

      expect(prisma.seed.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 75,
          take: 25,
        }),
      )
    })

    it('should apply strain/country/year filters', async () => {
      prisma.$transaction.mockResolvedValue([0, []])

      await repo.findAll('user-1', {
        strainId: 'strain-1',
        country: 'Brazil',
        harvestYear: '2024',
      } as any)

      expect(prisma.seed.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            userId: 'user-1',
            active: true,
            strainId: 'strain-1',
            country: { contains: 'Brazil', mode: 'insensitive' },
            harvestYear: { contains: '2024', mode: 'insensitive' },
          }),
        }),
      )
    })

    it('should apply search across multiple fields', async () => {
      prisma.$transaction.mockResolvedValue([0, []])

      await repo.findAll('user-1', {
        search: 'og',
      } as any)

      expect(prisma.seed.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: [
              { name: { contains: 'og', mode: 'insensitive' } },
              { nombreCultivar: { contains: 'og', mode: 'insensitive' } },
              { country: { contains: 'og', mode: 'insensitive' } },
              { code: { contains: 'og', mode: 'insensitive' } },
            ],
          }),
        }),
      )
    })
  })

  describe('findOne', () => {
    it('should find seed by id and user', async () => {
      prisma.seed.findFirst.mockResolvedValue({ id: 's1' })

      const result = await repo.findOne('user-1', 's1')

      expect(prisma.seed.findFirst).toHaveBeenCalledWith({
        where: {
          id: 's1',
          userId: 'user-1',
          active: true,
        },
      })

      expect(result).toEqual({ id: 's1' })
    })
  })

  describe('create', () => {
    it('should create seed', async () => {
      const data = { name: 'Seed A' } as any
      prisma.seed.create.mockResolvedValue({ id: 's1' })

      const result = await repo.create(data)

      expect(prisma.seed.create).toHaveBeenCalledWith({ data })
      expect(result).toEqual({ id: 's1' })
    })
  })

  describe('update', () => {
    it('should update seed scoped by user', async () => {
      prisma.seed.update.mockResolvedValue({ id: 's1' })

      const result = await repo.update('user-1', 's1', {
        name: 'Updated',
      } as any)

      expect(prisma.seed.update).toHaveBeenCalledWith({
        where: {
          id: 's1',
          userId: 'user-1',
          active: true,
        },
        data: { name: 'Updated' },
      })

      expect(result).toEqual({ id: 's1' })
    })
  })

  describe('softDelete', () => {
    it('should soft delete seed', async () => {
      prisma.seed.update.mockResolvedValue({})

      await repo.softDelete('user-1', 's1')

      expect(prisma.seed.update).toHaveBeenCalledWith({
        where: {
          id: 's1',
          userId: 'user-1',
          active: true,
        },
        data: { active: false },
      })
    })
  })

  describe('findByIdWithStrain', () => {
    it('should include strain relation', async () => {
      prisma.seed.findUnique.mockResolvedValue({ id: 's1' })

      const result = await repo.findByIdWithStrain('user-1', 's1')

      expect(prisma.seed.findUnique).toHaveBeenCalledWith({
        where: { id: 's1', userId: 'user-1', active: true },
        include: { strain: true },
      })

      expect(result).toEqual({ id: 's1' })
    })
  })
})
