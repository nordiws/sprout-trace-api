import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { createRemoteJWKSet, jwtVerify, JWTPayload } from 'jose'
import { UserService } from 'src/users/user.service'

const COGNITO_REGION = process.env.COGNITO_REGION!
const COGNITO_USER_POOL_ID = process.env.COGNITO_USER_POOL_ID!
const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID!

const ISSUER = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}`
const JWKS = createRemoteJWKSet(
  new URL(`${ISSUER}/.well-known/jwks.json`)
)

@Injectable()
export class CognitoAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      'isPublic',
      [context.getHandler(), context.getClass()],
    )

    if (isPublic) return true

    const request = context.switchToHttp().getRequest<Request>()
    const authHeader = request.headers.authorization

    if (!authHeader?.startsWith('Bearer '))
      throw new UnauthorizedException()

    const token = authHeader.replace('Bearer ', '')

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: ISSUER,
      audience: COGNITO_CLIENT_ID,
    })

    if (payload.token_use !== 'access')
      throw new UnauthorizedException('Invalid token use')

    const user = await this.resolveUserFromToken(payload)

    request.user = user
    return true
  }

  private async resolveUserFromToken(payload: JWTPayload) {
    const externalId = payload.sub as string

    const email =
      typeof payload.email === 'string' ? payload.email : undefined

    const username =
      typeof payload['cognito:username'] === 'string'
        ? payload['cognito:username']
        : undefined

    const roles = Array.isArray(payload['cognito:groups'])
      ? payload['cognito:groups']
      : []

    const dbUser = await this.userService.resolveFromExternalIdentity({
      externalId,
      email,
      name: username,
    })

    return {
      id: dbUser.id,
      email: dbUser.email ?? undefined,
      roles,
      username,
    }
  }
}