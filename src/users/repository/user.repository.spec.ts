import { UserRepository } from './user.repository'

type PrismaMock = {
  user: {
    upsert: jest.Mock
    findUnique: jest.Mock
  }
}

describe('UserRepository', () => {
  let repo: UserRepository
  let prisma: PrismaMock

  beforeEach(() => {
    prisma = {
      user: {
        upsert: jest.fn(),
        findUnique: jest.fn(),
      },
    }

    repo = new UserRepository(prisma as any)
  })

  describe('upsertByExternalId', () => {
    it('should upsert user with externalId', async () => {
      prisma.user.upsert.mockResolvedValue({ id: 'u1' })
      const email = 'test@gmail.com'

      const result = await repo.upsertByExternalId({
        externalId: 'ext-123',
        email: email,
        name: 'John',
      })

      expect(prisma.user.upsert).toHaveBeenCalledWith({
        where: { externalId: 'ext-123' },
        update: {
          email: email,
          name: 'John',
        },
        create: {
          externalId: 'ext-123',
          email: email,
          name: 'John',
          active: true,
        },
      })

      expect(result).toEqual({ id: 'u1' })
    })

    it('should allow optional fields undefined', async () => {
      prisma.user.upsert.mockResolvedValue({ id: 'u1' })

      await repo.upsertByExternalId({
        externalId: 'ext-123',
      })

      expect(prisma.user.upsert).toHaveBeenCalledWith({
        where: { externalId: 'ext-123' },
        update: {
          email: undefined,
          name: undefined,
        },
        create: {
          externalId: 'ext-123',
          email: undefined,
          name: undefined,
          active: true,
        },
      })
    })
  })

  describe('findById', () => {
    it('should find user by id', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 'u1' })

      const result = await repo.findById('u1')

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'u1' },
      })

      expect(result).toEqual({ id: 'u1' })
    })

    it('should return null if user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null)

      const result = await repo.findById('missing')

      expect(result).toBeNull()
    })
  })
})
