import { Inject, Injectable } from '@nestjs/common';
import type { IMediaProvider } from './interface/media-provider.interface';
import { MediaFolder } from 'src/common/enums/media.enum';

@Injectable()
export class MediaService {

    constructor(@Inject('MEDIA_PROVIDER') private readonly mediaProvider: IMediaProvider) { }

    getStorageSignature(folder: MediaFolder) {
        return this.mediaProvider.generateSignature(folder);
    }

}
