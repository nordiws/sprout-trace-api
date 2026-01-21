import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ExternalGoogleIdentity } from '../types/auth.type'
import type { GoogleTokenVerifier } from '../google/google-token-verifier.interface'

@Injectable()
export class GoogleAuthGuard implements CanActivate {

  constructor(private readonly verifier: GoogleTokenVerifier) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing Authorization header')
    }

    const token = authHeader.replace('Bearer ', '')

    try {
      const payload = await this.verifier.verify(token)

      if (!payload.sub) {
        throw new UnauthorizedException('Invalid token: missing sub')
      }

      request.externalIdentity = {
        provider: 'google',
        sub: payload.sub,
        email: payload.email,
        name: payload.name,
      } satisfies ExternalGoogleIdentity

      return true
    } catch (err) {
      throw new UnauthorizedException('Invalid Google token')
    }
  }
}
