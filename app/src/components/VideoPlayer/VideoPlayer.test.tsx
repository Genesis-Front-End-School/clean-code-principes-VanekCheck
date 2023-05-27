import { render, screen, fireEvent } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';

const mockedVideoPlayerProps = {
  id: 'uuid-uuid-uuid-uuid',
  src: 'test/src',
  poster: 'test/poster',
  muted: true,
  autoPlay: true,
  width: '80%',
  loop: false,
  controls: true,
  withPictureInPicture: true,
};

describe('VideoPlayer Component', () => {
  it('renders video player', () => {
    render(<VideoPlayer {...mockedVideoPlayerProps} />);
    const video = screen.getByTestId('video');
    expect(video).toBeInTheDocument();
  });

  it('verify that set the correct video attributes', () => {
    render(<VideoPlayer {...mockedVideoPlayerProps} />);
    const video: HTMLVideoElement = screen.getByTestId('video');

    expect(video.poster).toContain(mockedVideoPlayerProps.poster);
    expect(video.muted).toBe(mockedVideoPlayerProps.muted);
    expect(`${video.width}%`).toContain(mockedVideoPlayerProps.width);
    expect(video.loop).toBe(mockedVideoPlayerProps.loop);
    expect(video.controls).toBe(mockedVideoPlayerProps.controls);
  });

  it('sets the correct picture-in-picture button text', () => {
    render(<VideoPlayer {...mockedVideoPlayerProps} />);
    const buttonElement = screen.getByText('Picture In Picture');
    expect(buttonElement).toBeInTheDocument();
  });

  it('changes playback speed with up arrow and down key', () => {
    render(<VideoPlayer {...mockedVideoPlayerProps} />);
    const video: HTMLVideoElement = screen.getByTestId('video');
    fireEvent.keyDown(video, { code: 'ArrowUp' });

    expect(screen.getByText('current speed: 1.25x')).toBeInTheDocument();
    expect(video.playbackRate).toBe(1.25);

    fireEvent.keyDown(video, { code: 'ArrowDown' });
    fireEvent.keyDown(video, { code: 'ArrowDown' });

    expect(screen.getByText('current speed: 0.75x')).toBeInTheDocument();
    expect(video.playbackRate).toBe(0.75);
  });
});
