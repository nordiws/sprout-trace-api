import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { CurrentUserContext } from '../types/auth.type'

interface AuthenticatedRequest extends Request {
  user: CurrentUserContext
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CurrentUserContext => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>()
    return request.user
  },
)
