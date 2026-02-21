import { CurrentUserContext } from '../auth/types/auth.type'

declare module 'express-serve-static-core' {
  interface Request {
    user?: CurrentUserContext
  }
}