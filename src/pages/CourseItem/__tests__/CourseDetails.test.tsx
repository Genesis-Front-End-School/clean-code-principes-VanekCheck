import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import CourseDetails from '../CourseDetails';
import { mockCourse } from '../../../mocks';

jest.mock('../CoursePreviewSide', () => () => (
  <div data-testid='mock-preview-side'></div>
));
jest.mock('../CourseDescriptionSide', () => () => (
  <div data-testid='mock-description-side'></div>
));

const wrapper = ({ children }: { children: ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

describe('CourseDetails component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders the course details', () => {
    render(<CourseDetails {...mockCourse} />, { wrapper });

    expect(screen.getByTestId('arrow-left')).toBeInTheDocument();
    expect(screen.getByText('Course Details')).toBeInTheDocument();
  });

  it('renders the CoursePreviewSide component', () => {
    render(<CourseDetails {...mockCourse} />, { wrapper });
    expect(screen.getByTestId('mock-preview-side')).toBeInTheDocument();
  });

  it('renders the CourseDescriptionSide component', () => {
    render(<CourseDetails {...mockCourse} />, { wrapper });
    expect(screen.getByTestId('mock-description-side')).toBeInTheDocument();
  });
});
