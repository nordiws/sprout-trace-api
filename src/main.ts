import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import type { Request, Response } from 'express'
import * as admin from 'firebase-admin'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })

  const config = new DocumentBuilder()
    .setTitle('Sprout Trace API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('swagger-ui', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  app.getHttpAdapter().get('/openapi.json', (_req: Request, res: Response) => {
    res.type('application/json')
    res.send(document)
  })

  await app.listen(process.env.PORT ?? 3000)
}

void bootstrap()
