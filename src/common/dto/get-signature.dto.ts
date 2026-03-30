import { IsEnum, IsNotEmpty } from 'class-validator';
import { MediaFolder } from '../enums/media.enum';

export class GetSignatureDto {
  @IsEnum(MediaFolder, {
    message: `Folder must be one of: ${Object.values(MediaFolder).join(', ')}`,
  })
  @IsNotEmpty()
  folder: MediaFolder;
}