import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as admin from 'firebase-admin';
import { UserService } from 'src/users/user.service';
import { FirebaseAuthGuard } from './firebase-auth.guard';

// Mock the entire firebase-admin module
jest.mock('firebase-admin', () => ({
  auth: jest.fn().mockReturnValue({
    verifyIdToken: jest.fn(),
  }),
}));

describe('FirebaseAuthGuard', () => {
  let guard: FirebaseAuthGuard;
  let reflector: Reflector;
  let userService: UserService;

  const mockUserService = {
    resolveFromExternalIdentity: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FirebaseAuthGuard,
        { provide: Reflector, useValue: { getAllAndOverride: jest.fn() } },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    guard = module.get<FirebaseAuthGuard>(FirebaseAuthGuard);
    reflector = module.get<Reflector>(Reflector);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    let mockContext: Partial<ExecutionContext>;

    beforeEach(() => {
      mockContext = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            headers: {},
          }),
        }),
      };
    });

    it('should return true if route is marked as public', async () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
      const result = await guard.canActivate(mockContext as ExecutionContext);
      expect(result).toBe(true);
    });

    it('should throw UnauthorizedException if no auth header is present', async () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
      await expect(guard.canActivate(mockContext as ExecutionContext)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if token is invalid', async () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
      (mockContext.switchToHttp!().getRequest as jest.Mock).mockReturnValue({
        headers: { authorization: 'Bearer invalid-token' },
      });

      // Mock Firebase SDK to fail
      (admin.auth().verifyIdToken as jest.Mock).mockRejectedValue(new Error('Invalid'));

      await expect(guard.canActivate(mockContext as ExecutionContext)).rejects.toThrow(
        'Invalid or expired Firebase token',
      );
    });

    it('should resolve user and return true on valid token', async () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
      const mockRequest = { headers: { authorization: 'Bearer valid-token' }, user: null };
      (mockContext.switchToHttp!().getRequest as jest.Mock).mockReturnValue(mockRequest);

      const mockDecodedToken = { uid: '123', email: 'test@test.com', name: 'Test User' };
      const mockDbUser = { id: 'db-123', email: 'test@test.com', name: 'Test User' };

      (admin.auth().verifyIdToken as jest.Mock).mockResolvedValue(mockDecodedToken);
      mockUserService.resolveFromExternalIdentity.mockResolvedValue(mockDbUser);

      const result = await guard.canActivate(mockContext as ExecutionContext);

      expect(result).toBe(true);
      expect(mockRequest.user).toEqual({
        id: 'db-123',
        email: 'test@test.com',
        roles: [],
        username: 'Test User',
      });
    });
  });
});