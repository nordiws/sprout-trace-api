import { createRemoteJWKSet, jwtVerify } from 'jose';

const GOOGLE_ISSUER = 'https://accounts.google.com';
const GOOGLE_JWKS_URI = 'https://www.googleapis.com/oauth2/v3/certs';

const jwks = createRemoteJWKSet(new URL(GOOGLE_JWKS_URI));

export async function verifyGoogleToken(token: string) {
  const { payload } = await jwtVerify(token, jwks, {
    issuer: GOOGLE_ISSUER
    // audience can be validated optionally
  });

  return payload;
}
