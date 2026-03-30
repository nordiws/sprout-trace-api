import { MediaFolder } from "src/common/enums/media.enum";

export interface StorageSignature {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName?: string;
  folder: MediaFolder;
  uploadUrl: string;
}

export interface IMediaProvider {
  generateSignature(folder: MediaFolder): Promise<StorageSignature>;
}