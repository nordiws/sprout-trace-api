import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import type { Request, Response } from 'express'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Sprout Trace API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth()
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
