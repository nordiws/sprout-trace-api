import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { PrismaService } from 'src/prisma/prisma.service'
import type { ExternalGoogleIdentity } from './types/auth.type'

describe('AuthService', () => {
  let service: AuthService
  let prisma: PrismaService

  beforeEach(async () => {
    const mockPrismaService = {
      user: {
        upsert: jest.fn(),
      },
    }

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile()

    service = module.get(AuthService)
    prisma = module.get(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should upsert user by google sub and return user context', async () => {
    const identity: ExternalGoogleIdentity = {
      sub: 'google-sub-123',
      email: 'test@gmail.com',
      name: 'Test User',
      provider: 'google',
    }

    const upsertMock = prisma.user.upsert as jest.Mock

    upsertMock.mockResolvedValue({
      id: 'user-id-1',
      googleSub: identity.sub,
      email: identity.email,
      name: identity.name,
      active: true,
    } as any)

    const result = await service.loginWithGoogle(identity)

    expect(upsertMock).toHaveBeenCalledWith({
      where: { googleSub: identity.sub },
      update: {
        email: identity.email,
        name: identity.name,
      },
      create: {
        googleSub: identity.sub,
        email: identity.email,
        name: identity.name,
        active: true,
      },
    })

    expect(result).toEqual({
      user: {
        id: 'user-id-1',
        email: 'test@gmail.com',
      },
    })
  })

})
