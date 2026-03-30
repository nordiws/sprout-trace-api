import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { IMediaProvider, StorageSignature } from '../interface/media-provider.interface';
import dotenv from 'dotenv';
import { MediaFolder } from 'src/common/enums/media.enum';

dotenv.config();

@Injectable()
export class CloudinaryProvider implements IMediaProvider {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
      signature_algorithm : 'sha256',
    });
  }

  async generateSignature(folder: MediaFolder): Promise<StorageSignature> {
    const timestamp = Math.round(new Date().getTime() / 1000);
    
    const paramsToSign = { timestamp, folder };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET || '',
    );

    return {
      signature,
      timestamp,
      folder,
      apiKey: process.env.CLOUDINARY_API_KEY || '',
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
      uploadUrl: process.env.CLOUDINARY_IMAGE_URL || '',
    };
  }
}