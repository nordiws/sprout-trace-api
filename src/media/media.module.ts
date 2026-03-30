import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { CloudinaryProvider } from './provider/cloudinary.provider';

@Module({
  controllers: [MediaController],
  providers: [
    MediaService,
    {
      provide: 'MEDIA_PROVIDER',
      useClass: CloudinaryProvider,
    },
  ]
})
export class MediaModule {}
