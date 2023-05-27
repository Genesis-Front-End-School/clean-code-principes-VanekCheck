import Hls from 'hls.js';

class VideoService {
  videoInstance: Hls;

  constructor() {
    this.videoInstance = new Hls();
  }

  loadSrc(url: string) {
    this.videoInstance.loadSource(url);
  }

  attachVideo(video: HTMLMediaElement) {
    this.videoInstance.attachMedia(video);
  }
}

export { VideoService };
