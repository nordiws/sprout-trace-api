import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import { createRemoteJWKSet, jwtVerify } from 'jose';

const GOOGLE_ISSUER = process.env.GOOGLE_ISSUER ?? 'https://accounts.google.com';
const GOOGLE_JWKS_URI = process.env.GOOGLE_JWKS_URI ?? 'https://www.googleapis.com/oauth2/v3/certs';

const jwks = createRemoteJWKSet(new URL(GOOGLE_JWKS_URI));

export async function verifyGoogleToken(token: string) {
  const { payload } = await jwtVerify(token, jwks, {issuer: GOOGLE_ISSUER});
  return payload;
}
