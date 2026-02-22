import { PrismaService } from './prisma.service'

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      $connect = jest.fn()
      $disconnect = jest.fn()
    },
  }
})

jest.mock('@prisma/adapter-pg', () => ({
  PrismaPg: jest.fn(),
}))

jest.mock('pg', () => ({
  Pool: jest.fn(),
}))

describe('PrismaService', () => {
  let service: PrismaService

  beforeEach(() => {
    process.env.DATABASE_URL = 'postgres://test'
    service = new PrismaService()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should call $connect on module init', async () => {
    const connectSpy = jest.spyOn(service, '$connect').mockResolvedValue()

    await service.onModuleInit()

    expect(connectSpy).toHaveBeenCalled()
  })

  it('should call $disconnect on module destroy', async () => {
    const disconnectSpy = jest.spyOn(service, '$disconnect').mockResolvedValue()

    await service.onModuleDestroy()

    expect(disconnectSpy).toHaveBeenCalled()
  })
})
