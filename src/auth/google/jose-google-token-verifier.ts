import { createRemoteJWKSet, jwtVerify } from 'jose'
import { GoogleTokenVerifier } from './google-token-verifier.interface'
import { GoogleIdentity } from './google-identity.interface'

const GOOGLE_ISSUER =
  process.env.GOOGLE_ISSUER ?? 'https://accounts.google.com'

const GOOGLE_JWKS_URI =
  process.env.GOOGLE_JWKS_URI ??
  'https://www.googleapis.com/oauth2/v3/certs'

const jwks = createRemoteJWKSet(new URL(GOOGLE_JWKS_URI))

export class JoseGoogleTokenVerifier implements GoogleTokenVerifier {
  async verify(token: string): Promise<GoogleIdentity> {
    const { payload } = await jwtVerify(token, jwks, {
      issuer: GOOGLE_ISSUER,
    })

    return {
      sub: payload.sub!, // required by Google spec
      email: typeof payload.email === 'string' ? payload.email : undefined,
      name: typeof payload.name === 'string' ? payload.name : undefined,
    }
  }
}
