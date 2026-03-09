import { Module, Global } from '@nestjs/common'
import { UserModule } from 'src/users/user.module'
import { FirebaseAuthGuard } from './guards/firebase-auth.guard'
import { APP_GUARD } from '@nestjs/core'

@Global()
@Module({
  imports: [UserModule], 
  providers: [
    FirebaseAuthGuard,
    {
      provide: APP_GUARD,
      useClass: FirebaseAuthGuard,
    }],
  exports: [FirebaseAuthGuard],
})
export class AuthModule {}