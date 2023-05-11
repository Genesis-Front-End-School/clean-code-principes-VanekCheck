import { Grid } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import Rating from 'src/components/Rating/Rating';
import { getMinutes } from 'src/helpers/time';
import { ICourseWithLessons } from 'src/models';
import CourseDescriptionSide from '../CourseDescriptionSide';
import { mockCourse as mockCourseWithLessons } from '../../../mocks';

const mockCourse: ICourseWithLessons = {
  ...mockCourseWithLessons,
  meta: {
    ...mockCourseWithLessons.meta,
    skills: ['skill1', 'skill2', 'skill3'],
  },
};

jest.mock('src/components/Rating/Rating', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mock Rating Component</div>),
}));

jest.mock('src/helpers/time', () => ({
  __esModule: true,
  getMinutes: jest.fn((duration: number) => duration / 60),
}));

const wrapper = ({ children }: { children: ReactNode }) => {
  return <Grid>{children}</Grid>;
};

describe('CourseDescriptionSide component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render all course details correctly', () => {
    render(<CourseDescriptionSide {...mockCourse} />, { wrapper });

    expect(screen.getByText(mockCourse.title)).toBeInTheDocument();
    expect(screen.getByText(mockCourse.description)).toBeInTheDocument();
    expect(Rating).toHaveBeenCalledWith({ rating: mockCourse.rating }, {});

    mockCourse.tags.forEach((tag: string) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });

    expect(screen.getByText("What you'll learn")).toBeInTheDocument();
    mockCourse.meta.skills.forEach((skill: string) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it("should display 'contains locked lessons' text if the course contains locked lessons", () => {
    render(<CourseDescriptionSide {...mockCourse} />, { wrapper });
    expect(screen.getByText('(Contains locked lessons)')).toBeInTheDocument();
  });

  it("should not display 'contains locked lessons' text if the course does not contain locked lessons", () => {
    render(
      <CourseDescriptionSide {...mockCourse} containsLockedLessons={false} />,
      { wrapper }
    );
    expect(screen.queryByText('(Contains locked lessons)')).toBeNull();
  });

  it('should call getMinutes helper function with the correct arguments', () => {
    render(<CourseDescriptionSide {...mockCourse} />, { wrapper });
    expect(getMinutes).toHaveBeenCalledWith(mockCourse.duration);
  });

  it('should call Rating component with the correct arguments', () => {
    render(<CourseDescriptionSide {...mockCourse} />, { wrapper });
    expect(Rating).toHaveBeenCalledWith({ rating: mockCourse.rating }, {});
  });
});
