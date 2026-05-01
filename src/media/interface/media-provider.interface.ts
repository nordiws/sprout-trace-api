import { MediaFolder } from "src/common/enums/media.enum";

export interface StorageSignatureResponse {
  signature: string;
  timestamp: number;
  folder: MediaFolder;
  uploadUrl?: string;
  apiKey?: string;
}

export interface IMediaProvider {
  generateSignature(folder: MediaFolder): Promise<StorageSignatureResponse>;
}