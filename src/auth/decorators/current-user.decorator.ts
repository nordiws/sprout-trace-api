import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { CurrentUserContext } from '../types/auth.type'

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CurrentUserContext => {
    return ctx.switchToHttp().getRequest().user
  },
)
