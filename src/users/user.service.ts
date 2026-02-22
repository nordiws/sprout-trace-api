import { Injectable } from '@nestjs/common'
import { UserRepository } from './repository/user.repository'

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async resolveFromExternalIdentity(params: {
    externalId: string
    email?: string
    name?: string
  }) {
    const user = await this.repo.upsertByExternalId({
      externalId: params.externalId,
      email: params.email,
      name: params.name,
    })

    if (!user.active) {
      throw new Error('User disabled')
    }

    return user
  }
}
