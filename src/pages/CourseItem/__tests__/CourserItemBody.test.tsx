import { render, screen, fireEvent } from '@testing-library/react';
import { ILessonProps } from 'src/components/Lesson/Lesson';

import CourseItemBody from '../CourseItemBody';

jest.mock('src/components/Lesson/Lesson', () => ({
  __esModule: true,
  default: ({ id, title, handleLessonChange }: ILessonProps) => (
    <div onClick={() => handleLessonChange(id)}>{title}</div>
  ),
}));

jest.mock('src/components/VideoPlayer/VideoPlayer', () => ({
  __esModule: true,
  default: () => <div>Mock Video Player</div>,
}));

jest.mock('../CourseDetails', () => ({
  __esModule: true,
  default: () => <div>Mock Course Details</div>,
}));

jest.mock('src/router')

const useCourseItemQuerySpy = jest.spyOn(
  require('src/api/courses/hooks'),
  'useCourseItemQuery'
);

const mockCourse = {
  id: '1',
  title: 'Course Title',
  description: 'Course Description',
  lessons: [
    {
      id: '1',
      title: 'Lesson 1',
      order: 1,
    },
    {
      id: '2',
      title: 'Lesson 2',
      order: 2,
    },
  ],
};

describe('CourseItemBody Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should render loading spinner when courses are loading', () => {
    useCourseItemQuerySpy.mockReturnValue({
      isLoading: true,
      data: null,
    });
    render(<CourseItemBody />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders course details and lessons when isLoading is false', () => {
    useCourseItemQuerySpy.mockReturnValue({
      isLoading: false,
      data: mockCourse,
    });
    render(<CourseItemBody />);

    expect(screen.getByText('Mock Course Details')).toBeInTheDocument();
    expect(screen.getByText('Lesson 1')).toBeInTheDocument();
    expect(screen.getByText('Lesson 2')).toBeInTheDocument();
  });

  it('renders current lesson video when a lesson is clicked', () => {
    useCourseItemQuerySpy.mockReturnValue({
      isLoading: false,
      data: mockCourse,
    });
    render(<CourseItemBody />);

    const lesson2 = screen.getByText('Lesson 2');

    fireEvent.click(lesson2);

    expect(screen.getByText('Mock Video Player')).toBeInTheDocument();
    expect(screen.getByText('Current Video: 2. Lesson 2')).toBeInTheDocument();
  });
});
