import { CSSProperties } from "react";
import { UUID } from "src/models";

export interface VideoPlayerProps {
  id?: UUID;
  src: string;
  poster?: string;
  muted?: boolean;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  withPictureInPicture?: boolean;
  width?: CSSProperties['width'];
}

export interface IVideoPlayerRef extends HTMLVideoElement {
  currentTime: number;
}
