import { Grid } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { convertToLocalDateString } from 'src/helpers/time';
import CoursePreviewSide from '../CoursePreviewSide';
import { mockCourse } from '../../../mocks';

jest.mock('src/components/VideoPlayer/VideoPlayer', () => ({
  __esModule: true,
  default: () => <div>Mock Video Player</div>,
}));

const wrapper = ({ children }: { children: ReactNode }) => {
  return <Grid>{children}</Grid>;
};

describe('CoursePreviewSide component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders course status and launch date badges', () => {
    render(<CoursePreviewSide {...mockCourse} />, { wrapper });

    const statusBadge = screen.getByTestId('status-badge');
    const launchDateBadge = screen.getByText(
      `at ${convertToLocalDateString(mockCourse.launchDate)}`
    );
    expect(statusBadge).toBeInTheDocument();
    expect(launchDateBadge).toBeInTheDocument();
  });
});
