export interface CurrentUserContext {
  id: string
  email?: string
  roles?: string[]
}

export interface ExternalGoogleIdentity {
  provider: 'google'
  sub: string
  email: string
  name?: string
  picture?: string
}
