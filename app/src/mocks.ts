import { ICourseWithLessons } from "src/models";

export const mockCourse: ICourseWithLessons = {
  id: 'uuid-uuid-uuid-uuid',
  title: 'Test Course',
  tags: [],
  launchDate: '',
  status: 'launched',
  previewImageLink: 'image/preview/link',
  description: 'Test description',
  duration: 460,
  lessons: [],
  containsLockedLessons: true,
  rating: 5,
  meta: {
    slug: '',
    skills: [],
    courseVideoPreview: {
      link: 'video/link',
      duration: 60,
      previewImageLink: 'video/preview/link',
    },
  },
};
