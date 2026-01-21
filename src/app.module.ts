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
import { AuthModule } from './auth/auth.module'
import { GoogleAuthGuard } from './auth/guards/google-auth.guard'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'

@Module({
  imports: [
    PlantsModule,
    SeedsModule,
    StrainsModule,
    HarvestsModule,
    MetadataModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    PrismaService,
    {
      provide: 'APP_GUARD',
      useClass: GoogleAuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
