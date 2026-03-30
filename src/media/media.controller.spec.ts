import { Test, TestingModule } from '@nestjs/testing';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaFolder } from 'src/common/enums/media.enum';

describe('MediaController', () => {
  let controller: MediaController;
  let mediaService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [
        {
          provide: MediaService,
          useValue: {
            getStorageSignature: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MediaController>(MediaController);
    mediaService = module.get(MediaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSignature', () => {
    it('should call mediaService.getStorageSignature with folder from params', () => {
      const folder = MediaFolder.PLANTS;
      const expectedSignature = { signature: 'mock-sig', timestamp: 123456789 };
      mediaService.getStorageSignature.mockReturnValue(expectedSignature);

      const result = controller.getSignature({ folder } as any);

      expect(mediaService.getStorageSignature).toHaveBeenCalledWith(folder);
      expect(result).toEqual(expectedSignature);
    });
  });
});
