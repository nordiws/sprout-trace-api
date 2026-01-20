import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantsModule } from './plants/plants.module';
import { SeedsModule } from './seeds/seeds.module';
import { StrainsModule } from './strains/strains.module';
import { HarvestsModule } from './harvests/harvests.module';
import { PrismaService } from './prisma/prisma.service';
import { MetadataModule } from './metadata/metadata.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PlantsModule, SeedsModule, StrainsModule, HarvestsModule, MetadataModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
