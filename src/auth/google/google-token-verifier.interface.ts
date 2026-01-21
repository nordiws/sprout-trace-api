export abstract class GoogleTokenVerifier {
  abstract verify(token: string): Promise<{
    sub: string
    email?: string
    name?: string
  }>
}
