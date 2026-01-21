import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { verifyGoogleToken } from '../google/google-jwt'
import { ExternalGoogleIdentity } from '../types/auth.type'

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing Authorization header')
    }

    const token = authHeader.replace('Bearer ', '')

    try {
      const payload = await verifyGoogleToken(token)

      if (!payload.sub) {
        throw new UnauthorizedException('Invalid token: missing sub')
      }

      request.externalIdentity = {
        provider: 'google',
        sub: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      } satisfies ExternalGoogleIdentity

      return true
    } catch (err) {
      throw new UnauthorizedException('Invalid Google token')
    }
  }
}
