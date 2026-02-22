// MUST set env BEFORE importing guard
process.env.COGNITO_REGION = 'us-east-1'
process.env.COGNITO_USER_POOL_ID = 'pool'
process.env.COGNITO_CLIENT_ID = 'client'

import { ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { jwtVerify } from 'jose'
import { CognitoAuthGuard } from './cognito-auth.guard'
import { UserService } from 'src/users/user.service'
import { Request } from 'express'

jest.mock('jose', () => ({
  jwtVerify: jest.fn(),
  createRemoteJWKSet: jest.fn(() => ({})),
}))

describe('CognitoAuthGuard', () => {
  let guard: CognitoAuthGuard
  let reflector: Reflector
  let userService: jest.Mocked<UserService>
  const bearerToken = 'Bearer xxx.yyy.zzz'
  const externalId = 'cognito-user-123'
  const email = 'test@mail.com'

  const mockExecutionContext = (req: Partial<Request>): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => req as Request,
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    }) as unknown as ExecutionContext

  beforeEach(() => {
    reflector = {
      getAllAndOverride: jest.fn(),
    } as any

    userService = {
      resolveFromExternalIdentity: jest.fn(),
    } as any

    guard = new CognitoAuthGuard(reflector, userService)
    jest.clearAllMocks()
  })

  it('should allow public routes', async () => {
    ;(reflector.getAllAndOverride as jest.Mock).mockReturnValue(true)

    const ctx = mockExecutionContext({ headers: {} })

    const result = await guard.canActivate(ctx)

    expect(result).toBe(true)
    expect(jwtVerify).not.toHaveBeenCalled()
  })

  it('should throw if no authorization header', async () => {
    ;(reflector.getAllAndOverride as jest.Mock).mockReturnValue(false)

    const ctx = mockExecutionContext({ headers: {} })

    await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException)
  })

  it('should throw if header not bearer', async () => {
    ;(reflector.getAllAndOverride as jest.Mock).mockReturnValue(false)

    const ctx = mockExecutionContext({
      headers: { authorization: bearerToken },
    })

    await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException)
  })

  it('should throw if jwtVerify fails (expired/invalid)', async () => {
    ;(reflector.getAllAndOverride as jest.Mock).mockReturnValue(false)
    ;(jwtVerify as jest.Mock).mockRejectedValue(new Error('invalid token'))

    const ctx = mockExecutionContext({
      headers: { authorization: bearerToken },
    })

    await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException)
  })

  it('should throw if token_use is not access', async () => {
    ;(reflector.getAllAndOverride as jest.Mock).mockReturnValue(false)
    ;(jwtVerify as jest.Mock).mockResolvedValue({
      payload: {
        sub: '123',
        token_use: 'id',
      },
    })

    const ctx = mockExecutionContext({
      headers: { authorization: bearerToken },
    })

    await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException)
  })

  it('should verify token, resolve user and attach to request', async () => {
    ;(reflector.getAllAndOverride as jest.Mock).mockReturnValue(false)

    const payload = {
      sub: externalId,
      email: email,
      token_use: 'access',
      'cognito:username': 'john',
      'cognito:groups': ['admin'],
    }

    ;(jwtVerify as jest.Mock).mockResolvedValue({ payload })

    userService.resolveFromExternalIdentity.mockResolvedValue({
      id: 'db-1',
      email: email,
      active: true,
    } as any)

    const req: any = {
      headers: { authorization: bearerToken },
    }

    const ctx = mockExecutionContext(req)

    const result = await guard.canActivate(ctx)

    expect(result).toBe(true)
    expect(jwtVerify).toHaveBeenCalled()

    expect(userService.resolveFromExternalIdentity).toHaveBeenCalledWith({
      externalId: externalId,
      email: email,
      name: 'john',
    })

    expect(req.user).toEqual({
      id: 'db-1',
      email: email,
      roles: ['admin'],
      username: 'john',
    })
  })

  it('should handle missing optional fields', async () => {
    ;(reflector.getAllAndOverride as jest.Mock).mockReturnValue(false)

    const payload = {
      sub: externalId,
      token_use: 'access',
    }

    ;(jwtVerify as jest.Mock).mockResolvedValue({ payload })

    userService.resolveFromExternalIdentity.mockResolvedValue({
      id: 'db-1',
      email: null,
      active: true,
    } as any)

    const req: any = {
      headers: { authorization: bearerToken },
    }

    const ctx = mockExecutionContext(req)

    await guard.canActivate(ctx)

    expect(userService.resolveFromExternalIdentity).toHaveBeenCalledWith({
      externalId: externalId,
      email: undefined,
      name: undefined,
    })

    expect(req.user).toEqual({
      id: 'db-1',
      email: undefined,
      roles: [],
      username: undefined,
    })
  })
})
