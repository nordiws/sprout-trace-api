import { Test } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GoogleAuthGuard } from './guards/google-auth.guard'

describe('AuthController', () => {
  let controller: AuthController
  let authService: jest.Mocked<AuthService>

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            loginWithGoogle: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(GoogleAuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile()

    controller = module.get(AuthController)
    authService = module.get(AuthService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call loginWithGoogle', async () => {
    const request = {
      externalIdentity: {
        sub: 'google-sub',
        email: 'test@gmail.com',
      },
    }

    await controller.googleLogin(request as any)

    expect(authService.loginWithGoogle).toHaveBeenCalledWith(
      request.externalIdentity,
    )
  })
})
