import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import { createRemoteJWKSet, JWTPayload, jwtVerify } from 'jose';

const GOOGLE_ISSUER = process.env.GOOGLE_ISSUER ?? 'https://accounts.google.com';
const GOOGLE_JWKS_URI = process.env.GOOGLE_JWKS_URI ?? 'https://www.googleapis.com/oauth2/v3/certs';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;

const jwks = createRemoteJWKSet(new URL(GOOGLE_JWKS_URI));

export interface GoogleIdTokenPayload extends JWTPayload {
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
}

export async function verifyGoogleToken(
  token: string
): Promise<GoogleIdTokenPayload> {
  const { payload } = await jwtVerify(token, jwks, {
    issuer: GOOGLE_ISSUER,
    audience: GOOGLE_CLIENT_ID, // ✅ CRITICAL
  });

  if (!payload.email) {
    throw new Error("Google token missing email");
  }

  if (!payload.email_verified) {
    throw new Error("Google email not verified");
  }

  return payload as GoogleIdTokenPayload;
}