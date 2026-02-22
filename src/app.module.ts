import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PlantsModule } from './plants/plants.module'
import { SeedsModule } from './seeds/seeds.module'
import { StrainsModule } from './strains/strains.module'
import { HarvestsModule } from './harvests/harvests.module'
import { PrismaService } from './prisma/prisma.service'
import { MetadataModule } from './metadata/metadata.module'
import { PrismaModule } from './prisma/prisma.module'
import { APP_GUARD } from '@nestjs/core'
import { CognitoAuthGuard } from './auth/guards/cognito-auth.guard'
import { UserModule } from './users/user.module'

@Module({
  imports: [
    PlantsModule,
    SeedsModule,
    StrainsModule,
    HarvestsModule,
    MetadataModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: CognitoAuthGuard,
    },
  ],
})
export class AppModule {}
