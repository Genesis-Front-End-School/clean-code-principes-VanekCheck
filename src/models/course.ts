import { UUID } from "./common";
import { ILesson } from "./lesson";

export interface ICourse {
  id: UUID;
  title: string;
  tags: string[];
  launchDate: string;
  status: "launched";
  description: string;
  duration: number;
  lessonsCount: number;
  containsLockedLessons: boolean;
  previewImageLink: string;
  rating: number;
  meta: {
    slug: string;
    skills: string[];
    courseVideoPreview: {
      link: string;
      duration: number;
      previewImageLink: string;
    };
  };
}

export interface ICourseWithLessons extends Omit<ICourse, "lessonsCount"> {
  lessons: ILesson[];
}
