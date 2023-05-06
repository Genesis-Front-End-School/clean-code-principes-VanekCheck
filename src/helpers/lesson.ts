import { TDifficulty } from "src/api/courses/types";

export const getDifficultyColor = (difficulty: TDifficulty) => {
  switch (difficulty) {
    case "easy":
      return "green.8";
    case "medium":
      return "yellow.8";
    case "hard":
      return "red.8";
    default:
      return "";
  }
};
