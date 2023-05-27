import { render, screen } from '@testing-library/react';
import CoursePreviewMedia from './CoursePreviewMedia';

jest.mock('services-library');

const coursePreviewMediaProps = {
  videoSrc: 'video/src/test',
  photoSrc: 'photo/src/test',
  hovered: false,
};

describe('CoursePreviewMedia Component', () => {
  it('renders an image when not hovered', () => {
    render(<CoursePreviewMedia {...coursePreviewMediaProps} />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      `${coursePreviewMediaProps.photoSrc}/cover.webp`
    );
  });

  it('renders a video player when hovered', async () => {
    render(<CoursePreviewMedia {...coursePreviewMediaProps} hovered={true} />);
    const video: HTMLVideoElement = screen.getByTestId('video');
    expect(video).toBeInTheDocument();
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
  });
});
