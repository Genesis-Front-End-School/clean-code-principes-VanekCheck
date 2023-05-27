import { render, screen } from '@testing-library/react';
import { ICourse } from 'src/models';
import Courses from '../Courses';

jest.mock('src/components/Course/Course', () => {
  return function MockedCourse(props: ICourse) {
    return <div key={props.id}>{props.title}</div>;
  };
});

jest.mock('src/constants/courses', () => {
  return {
    COURSES_PER_PAGE: 1,
  };
});

const useCoursesQuery = jest.spyOn(
  require('src/api/courses/hooks'),
  'useCoursesQuery'
);

describe('Courses component', () => {
  it('should render loading spinner when courses are loading', () => {
    useCoursesQuery.mockReturnValue({
      isLoading: true,
      data: null,
    });

    render(<Courses />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render courses',async () => {
    useCoursesQuery.mockReturnValue({
      isLoading: false,
      data: [
        { id: '1', title: 'Course 1' },
        { id: '2', title: 'Course 2' },
      ],
    });

    render(<Courses />);

    expect(screen.getByText('Course 1')).toBeInTheDocument();
  });

  it('should show pagination', () => {
    useCoursesQuery.mockReturnValue({
      isLoading: false,
      data: [
        { id: '1', title: 'Course 1' },
        { id: '2', title: 'Course 2' },
        { id: '3', title: 'Course 3' },
      ],
    });

    render(<Courses />);

    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
