import { render, screen } from '@testing-library/react';
import Lesson, { ILessonProps } from './Lesson';

const handleLessonChange = jest.fn();

const mockedLessonProps: ILessonProps = {
  handleLessonChange,
  isActive: true,
  id: 'uuid-uuid-uuid-uuid',
  status: 'unlocked',
  previewImageLink: 'image-link-url',
  order: 1,
  title: 'Test Lesson',
  duration: 80,
  meta: null,
  type: 'video',
  link: 'url',
};

describe('Lesson Component', () => {
  it('renders lesson title and duration', () => {
    render(<Lesson {...mockedLessonProps} />);
    expect(screen.getByText('1. Test Lesson')).toBeInTheDocument();
    expect(screen.getByText('1.20 minutes')).toBeInTheDocument();
  });

  it('renders locked lesson', () => {
    const propsWithLockedStatus: ILessonProps = {
      ...mockedLessonProps,
      status: 'locked',
    };
    render(<Lesson {...propsWithLockedStatus} />);
    expect(screen.getByTestId('lock-icon')).toBeInTheDocument();
  });

  it('calls handleLessonChange when clicked', () => {
    const propsWithActiveState: ILessonProps = {
      ...mockedLessonProps,
      isActive: true,
    };
    render(<Lesson {...propsWithActiveState} />);
    const lessonWrapper = screen.getByRole('button');
    lessonWrapper.click();
    expect(mockedLessonProps.handleLessonChange).toHaveBeenCalledTimes(1);
    expect(mockedLessonProps.handleLessonChange).toHaveBeenCalledWith(
      mockedLessonProps.id
    );
  });

  it('do not call handleLessonChange when clicked and status is locked', () => {
    const propsWithLockedStatus: ILessonProps = {
      ...mockedLessonProps,
      status: 'locked',
    };
    render(<Lesson {...propsWithLockedStatus} />);
    const lessonWrapper = screen.getByRole('button');
    lessonWrapper.click();
    expect(mockedLessonProps.handleLessonChange).not.toHaveBeenCalled();
  });
});
