import { StrainsRepository } from './strains.repository'

type PrismaMock = {
  strain: {
    count: jest.Mock
    findMany: jest.Mock
    findFirst: jest.Mock
    create: jest.Mock
    update: jest.Mock
  }
  $transaction: jest.Mock
}

describe('StrainsRepository', () => {
  let repo: StrainsRepository
  let prisma: PrismaMock

  beforeEach(() => {
    prisma = {
      strain: {
        count: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      $transaction: jest.fn(),
    }

    repo = new StrainsRepository(prisma as any)
  })

  describe('findAll', () => {
    it('should use default pagination', async () => {
      prisma.$transaction.mockResolvedValue([5, [{ id: 'st1' }]])

      const result = await repo.findAll('user-1', {} as any)

      expect(prisma.strain.count).toHaveBeenCalledWith({
        where: { userId: 'user-1', active: true },
      })

      expect(prisma.strain.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: 'user-1', active: true },
          skip: 0,
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            plants: { where: { active: true } },
          },
        }),
      )

      expect(result).toEqual({
        total: 5,
        data: [{ id: 'st1' }],
      })
    })

    it('should apply pagination correctly', async () => {
      prisma.$transaction.mockResolvedValue([0, []])

      await repo.findAll('user-1', { page: 2, limit: 25 } as any)

      expect(prisma.strain.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 25,
          take: 25,
        }),
      )
    })

    it('should apply type filter', async () => {
      prisma.$transaction.mockResolvedValue([0, []])

      await repo.findAll('user-1', { type: 'INDICA' } as any)

      expect(prisma.strain.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            userId: 'user-1',
            active: true,
            type: 'INDICA',
          }),
        }),
      )
    })

    it('should apply search filter', async () => {
      prisma.$transaction.mockResolvedValue([0, []])

      await repo.findAll('user-1', { search: 'og' } as any)

      expect(prisma.strain.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: [
              { name: { contains: 'og', mode: 'insensitive' } },
              { description: { contains: 'og', mode: 'insensitive' } },
            ],
          }),
        }),
      )
    })
  })

  describe('findOne', () => {
    it('should find strain by id and user', async () => {
      prisma.strain.findFirst.mockResolvedValue({ id: 'st1' })

      const result = await repo.findOne('user-1', 'st1')

      expect(prisma.strain.findFirst).toHaveBeenCalledWith({
        where: {
          id: 'st1',
          userId: 'user-1',
          active: true,
        },
      })

      expect(result).toEqual({ id: 'st1' })
    })
  })

  describe('create', () => {
    it('should create strain', async () => {
      const data = { name: 'OG Kush' } as any
      prisma.strain.create.mockResolvedValue({ id: 'st1' })

      const result = await repo.create(data)

      expect(prisma.strain.create).toHaveBeenCalledWith({ data })
      expect(result).toEqual({ id: 'st1' })
    })
  })

  describe('update', () => {
    it('should update strain scoped by user', async () => {
      prisma.strain.update.mockResolvedValue({ id: 'st1' })

      const result = await repo.update('user-1', 'st1', {
        name: 'Updated',
      } as any)

      expect(prisma.strain.update).toHaveBeenCalledWith({
        where: {
          id: 'st1',
          userId: 'user-1',
          active: true,
        },
        data: { name: 'Updated' },
      })

      expect(result).toEqual({ id: 'st1' })
    })
  })

  describe('softDelete', () => {
    it('should soft delete strain', async () => {
      prisma.strain.update.mockResolvedValue({})

      await repo.softDelete('user-1', 'st1')

      expect(prisma.strain.update).toHaveBeenCalledWith({
        where: {
          id: 'st1',
          userId: 'user-1',
          active: true,
        },
        data: { active: false },
      })
    })
  })

  describe('findByIdWithPlants', () => {
    it('should include only active plants', async () => {
      prisma.strain.findFirst.mockResolvedValue({ id: 'st1' })

      const result = await repo.findByIdWithPlants('user-1', 'st1')

      expect(prisma.strain.findFirst).toHaveBeenCalledWith({
        where: {
          id: 'st1',
          userId: 'user-1',
          active: true,
        },
        include: {
          plants: {
            where: { active: true },
          },
        },
      })

      expect(result).toEqual({ id: 'st1' })
    })
  })
})
