import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CurrentUserContext, ExternalGoogleIdentity } from './types/auth.type'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async loginWithGoogle(identity: ExternalGoogleIdentity) {
    const user = await this.prisma.user.upsert({
      where: { googleSub: identity.sub },
      update: {
        email: identity.email,
        name: identity.name,
      },
      create: {
        googleSub: identity.sub,
        email: identity.email,
        name: identity.name,
        active: true,
      },
    })

    return {
      user: {
        id: user.id,
        email: user.email ?? undefined,
      } satisfies CurrentUserContext,
    }
  }
}
