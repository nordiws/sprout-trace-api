import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { CurrentUserContext } from "../types/auth.type";
import { JwtService } from "@nestjs/jwt";


const JWT_SECRET = process.env.JWT_SECRET ?? "secret";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService) {}


  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedException();
    }

    const token = authHeader.replace("Bearer ", "");
    const payload = this.jwtService.verify(token, { secret: JWT_SECRET });

    request.user = {
      id: payload.sub,
      email: payload.email,
      roles: payload.roles,
    } satisfies CurrentUserContext;

    return true;
  }
}
