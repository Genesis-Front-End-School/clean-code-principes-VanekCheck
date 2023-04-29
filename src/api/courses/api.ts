import privateApi from "src/configs/privateApi";
import { ICourseWithLessons } from "src/models";
import type { ICoursesResponse } from "./types";

export const getCourses = async (): Promise<ICoursesResponse> => {
  return privateApi.get("/core/preview-courses").then((res) => res.data);
};

export const getCourseById = async (
  id: string
): Promise<ICourseWithLessons> => {
  return privateApi.get(`/core/preview-courses/${id}`).then((res) => res.data);
};
