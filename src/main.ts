import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { GoogleAuthGuard } from './auth/guards/google-auth.guard'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalGuards(new GoogleAuthGuard())
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
