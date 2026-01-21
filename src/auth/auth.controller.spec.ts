import { Test } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

describe('AuthController', () => {
  let controller: AuthController

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
    }).compile()

    controller = module.get(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
