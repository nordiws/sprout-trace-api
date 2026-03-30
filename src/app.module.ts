import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PlantsModule } from './plants/plants.module'
import { SeedsModule } from './seeds/seeds.module'
import { StrainsModule } from './strains/strains.module'
import { HarvestsModule } from './harvests/harvests.module'
import { MetadataModule } from './metadata/metadata.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './users/user.module'
import { AuthModule } from './auth/auth.module'
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    PlantsModule,
    SeedsModule,
    StrainsModule,
    HarvestsModule,
    MetadataModule,
    PrismaModule,
    UserModule,
    AuthModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
