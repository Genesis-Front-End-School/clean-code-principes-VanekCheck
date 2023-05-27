import { Center, Image } from "@mantine/core";
import { FC } from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

interface CoursePreviewMediaProps {
  videoSrc: string;
  photoSrc: string;
  hovered: boolean;
}

const CoursePreviewMedia: FC<CoursePreviewMediaProps> = ({
  videoSrc,
  photoSrc,
  hovered,
}) => {
  return (
    <Center w={'100%'} miw={'100%'}>
      {hovered ? (
        <VideoPlayer src={videoSrc} muted loop controls={false} autoPlay />
      ) : (
        <Image
          src={`${photoSrc}/cover.webp`}
          sx={({ colorScheme }) => ({
            filter:
              colorScheme === "dark"
                ? "brightness(70%) contrast(130%)"
                : "none",
          })}
        />
      )}
    </Center>
  );
};

export default CoursePreviewMedia;
