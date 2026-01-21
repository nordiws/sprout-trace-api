import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthController } from './auth.controller'
import type { StringValue } from 'ms'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: {
        expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as StringValue,
      },
    }),
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
