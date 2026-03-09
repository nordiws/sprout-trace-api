import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as admin from 'firebase-admin'; // Switch to Firebase Admin
import { UserService } from 'src/users/user.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) return true

    const request = context.switchToHttp().getRequest<Request>()
    const authHeader = request.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) throw new UnauthorizedException()

    const token = authHeader.replace('Bearer ', '')

    try {
      // Firebase verifies the signature, expiration, and audience automatically
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      request.user = await this.resolveUserFromToken(decodedToken);;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired Firebase token');
    }
  }

  private async resolveUserFromToken(payload: admin.auth.DecodedIdToken) {
    // In Firebase, 'sub' is identical to 'uid'
    const externalId = payload.uid; 
    const email = payload.email;

    // Firebase doesn't have "groups" by default like Cognito. 
    // If you use Custom Claims, they're on the payload.
    const roles = (payload.roles as string[]) || [];

    const dbUser = await this.userService.resolveFromExternalIdentity({
      externalId,
      email,
      name: payload.name || email?.split('@')[0], // Fallback if name is missing
    });

    return {
      id: dbUser.id,
      email: dbUser.email ?? undefined,
      roles,
      username: dbUser.name ?? undefined,
    };
  }
}