export interface VideoPlayerProps {
  id?: string;
  src: string;
  poster?: string;
  muted?: boolean;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  withPictureInPicture?: boolean;
  width?: number | string;
}

export interface IVideoPlayerRef extends HTMLVideoElement {
  currentTime: number;
}
