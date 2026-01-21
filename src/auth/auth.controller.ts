import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleAuthGuard } from './guards/google-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(@Req() request: any) {
    return this.authService.loginWithGoogle(request.externalIdentity)
  }
}
