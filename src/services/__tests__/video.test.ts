import Hls from 'hls.js';
import { VideoService } from '../video';

jest.mock('hls.js');

describe('Video service', () => {
  beforeEach(() => {
    const MockedHls = Hls as jest.MockedClass<typeof Hls>;
    MockedHls.mockClear();
  });

  describe('loadSrc', () => {
    it('calls videoInstance.loadSource with the provided URL', () => {
      const videoService = new VideoService();
      const mockLoadSource = jest.fn();
      videoService.videoInstance.loadSource = mockLoadSource;

      const url = 'https://example.com/video.m3u8';
      videoService.loadSrc(url);

      expect(mockLoadSource).toHaveBeenCalledTimes(1);
      expect(mockLoadSource).toHaveBeenCalledWith(url);
    });
  });

  describe('attachVideo', () => {
    it('calls videoInstance.attachMedia with the provided HTMLMediaElement', () => {
      const videoService = new VideoService();
      const mockAttachMedia = jest.fn();
      videoService.videoInstance.attachMedia = mockAttachMedia;

      const video = document.createElement('video');
      videoService.attachVideo(video);

      expect(mockAttachMedia).toHaveBeenCalledTimes(1);
      expect(mockAttachMedia).toHaveBeenCalledWith(video);
    });
  });
});
