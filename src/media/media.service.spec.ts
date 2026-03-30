import { Test, TestingModule } from '@nestjs/testing';
import { MediaService } from './media.service';
import { MediaFolder } from 'src/common/enums/media.enum';

describe('MediaService', () => {
  let service: MediaService;
  let mediaProvider: any;

  beforeEach(async () => {
    const mockMediaProvider = {
      generateSignature: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        {
          provide: 'MEDIA_PROVIDER',
          useValue: mockMediaProvider,
        },
      ],
    }).compile();

    service = module.get<MediaService>(MediaService);
    mediaProvider = module.get('MEDIA_PROVIDER');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStorageSignature', () => {
    it('should call generateSignature with the correct folder', () => {
      const folder = MediaFolder.PLANTS;
      const expectedSignature = { signature: 'mock-sig', timestamp: 123456789 };
      mediaProvider.generateSignature.mockReturnValue(expectedSignature);

      const result = service.getStorageSignature(folder);

      expect(mediaProvider.generateSignature).toHaveBeenCalledWith(folder);
      expect(result).toBe(expectedSignature);
    });
  });
});
