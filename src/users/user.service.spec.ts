import { UserService } from './user.service'
import { UserRepository } from './repository/user.repository'

describe('UserService', () => {
  let service: UserService
  let repo: jest.Mocked<UserRepository>
  const email = 'test@gmail.com'

  beforeEach(() => {
    repo = {
      upsertByExternalId: jest.fn(),
    } as any

    service = new UserService(repo)
  })

  it('should call repository with correct params', async () => {
    repo.upsertByExternalId.mockResolvedValue({
      id: '1',
      email: email,
      active: true,
    } as any)

    await service.resolveFromExternalIdentity({
      externalId: 'ext-1',
      email: email,
      name: 'john',
    })

    expect(repo.upsertByExternalId).toHaveBeenCalledWith({
      externalId: 'ext-1',
      email: email,
      name: 'john',
    })
  })

  it('should return user if active', async () => {
    const user = {
      id: '1',
      email: email,
      active: true,
    }

    repo.upsertByExternalId.mockResolvedValue(user as any)

    const result = await service.resolveFromExternalIdentity({
      externalId: 'ext-1',
    })

    expect(result).toEqual(user)
  })

  it('should throw if user is disabled', async () => {
    repo.upsertByExternalId.mockResolvedValue({
      id: '1',
      active: false,
    } as any)

    await expect(
      service.resolveFromExternalIdentity({
        externalId: 'ext-1',
      }),
    ).rejects.toThrow('User disabled')
  })

  it('should propagate repository errors', async () => {
    repo.upsertByExternalId.mockRejectedValue(new Error('DB exploded'))

    await expect(
      service.resolveFromExternalIdentity({
        externalId: 'ext-1',
      }),
    ).rejects.toThrow('DB exploded')
  })
})
