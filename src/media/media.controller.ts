import { Controller, Get, Param } from '@nestjs/common';
import { MediaService } from './media.service';
import { GetSignatureDto } from '../common/dto/get-signature.dto';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Get('signature/:folder')
    getSignature(@Param() params: GetSignatureDto){
        return this.mediaService.getStorageSignature(params.folder);
    }
}
