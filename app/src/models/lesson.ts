import { TDifficulty, UUID } from "./common";

export interface ILesson {
  id: UUID;
  title: string;
  duration: number;
  order: number;
  type: "video";
  status: "unlocked" | "locked";
  link: string;
  previewImageLink: string;
  meta: null | {
    difficulty: TDifficulty;
  };
}

