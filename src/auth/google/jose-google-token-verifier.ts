import { createRemoteJWKSet, jwtVerify } from 'jose'
import { GoogleTokenVerifier } from './google-token-verifier.interface'
import { GoogleIdentity } from './google-identity.interface'

const JWT_ISSUER =
  process.env.JWT_ISSUER ?? 'https://accounts.google.com'

const JWT_JWKS_URI =
  process.env.JWT_JWKS_URI ??
  'https://www.googleapis.com/oauth2/v3/certs'

const jwks = createRemoteJWKSet(new URL(JWT_JWKS_URI))

export class JoseGoogleTokenVerifier implements GoogleTokenVerifier {
  async verify(token: string): Promise<GoogleIdentity> {
    const { payload } = await jwtVerify(token, jwks, {
      issuer: JWT_ISSUER,
    })

    return {
      sub: payload.sub!, // required by Google spec
      email: typeof payload.email === 'string' ? payload.email : undefined,
      name: typeof payload.name === 'string' ? payload.name : undefined,
    }
  }
}
