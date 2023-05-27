import { getCourses, getCourseById } from '../api';
import privateApi from 'src/configs/privateApi';

jest.mock('src/configs/privateApi', () => ({
  get: jest.fn(),
}));

describe('courses api', () => {
  describe('getCourses', () => {
    it('should return a list of courses', async () => {
      const coursesResponse = { courses: [{ id: 'uuid-c', name: 'Course 1' }] };
      (privateApi.get as jest.Mock).mockResolvedValueOnce({
        data: coursesResponse,
      });

      const result = await getCourses();
      expect(result).toEqual(coursesResponse);
    });
  });

  describe('getCourseById', () => {
    it('should return a course with lessons', async () => {
      const courseId = '1';
      const courseResponse = {
        id: 'uuid',
        name: 'Course 1',
        lessons: [{ id: 'uuid1', name: 'Lesson 1' }],
      };
      (privateApi.get as jest.Mock).mockResolvedValueOnce({
        data: courseResponse,
      });

      const result = await getCourseById(courseId);

      expect(result).toEqual(courseResponse);
      expect(privateApi.get).toHaveBeenCalledWith(
        `/core/preview-courses/${courseId}`
      );
    });
  });
});
