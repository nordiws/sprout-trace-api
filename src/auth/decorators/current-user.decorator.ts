import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserData } from '../interface/current-user.interface';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CurrentUserData => {
    return ctx.switchToHttp().getRequest().user;
  }
);
