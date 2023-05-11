import { render, screen } from '@testing-library/react';
import Course from './Course';
import { ICourse } from 'src/models';
import { useHover } from '@mantine/hooks';
import { mockCourse as mockCourseWithLessons } from 'src/mocks';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactNode } from 'react';

jest.mock('@mantine/hooks', () => ({
  useHover: jest.fn(),
}));

jest.mock('src/components/Rating/Rating', () => ({
  __esModule: true,
  default: jest.fn(({ rating }) => <div>{rating}</div>),
}));

jest.mock('src/components/CoursePreviewMedia/CoursePreviewMedia', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mock Course Preview Media</div>),
}));

const wrapper = ({ children }: { children: ReactNode }) => {
  return <Router>{children}</Router>;
};

describe('Course component', () => {
  const mockCourse: ICourse = {
    id: '1',
    title: 'Test Course',
    description: 'This is a test course',
    previewImageLink: 'https://example.com/image.jpg',
    duration: 120,
    lessonsCount: 10,
    status: 'launched',
    launchDate: '2023-02-02',
    containsLockedLessons: false,
    rating: 4.5,
    tags: ['Test Tag 1', 'Test Tag 2'],
    meta: mockCourseWithLessons.meta,
  };

  beforeEach(() => {
    (useHover as jest.Mock).mockReturnValue({
      hovered: false,
      ref: jest.fn(),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the course title', () => {
    render(<Course {...mockCourse} />, { wrapper });
    expect(screen.getByText(mockCourse.title)).toBeInTheDocument();
  });

  it('renders the course description', () => {
    render(<Course {...mockCourse} />, { wrapper });
    expect(screen.getByText(mockCourse.description)).toBeInTheDocument();
  });

  it('renders the course lesson count', () => {
    render(<Course {...mockCourse} />, { wrapper });
    expect(
      screen.getByText(`${mockCourse.lessonsCount} Lessons`)
    ).toBeInTheDocument();
  });

  it('renders the course tags', () => {
    render(<Course {...mockCourse} />, { wrapper });
    mockCourse.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('renders the lock icon if the course contains locked lessons', () => {
    const mockCourseWithLockedLessons: ICourse = {
      ...mockCourse,
      containsLockedLessons: true,
    };
    render(<Course {...mockCourseWithLockedLessons} />, { wrapper });
    expect(screen.getByTestId('lock-icon')).toBeInTheDocument();
  });
});
