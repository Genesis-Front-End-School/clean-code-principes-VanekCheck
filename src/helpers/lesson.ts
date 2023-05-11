import { TDifficulty } from "src/models";

export const getDifficultyColor = (difficulty: TDifficulty): string => {
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
