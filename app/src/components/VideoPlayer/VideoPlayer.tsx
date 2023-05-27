import { FC, useEffect, useRef, useState } from "react";
import {
  Button,
  Flex,
  Group,
  Image,
  Popover,
  Text,
  useMantineColorScheme,
} from "@mantine/core";

import { VideoPlayerProps, IVideoPlayerRef } from "./types";
import { StorageService, VideoService } from "services-library";
import { PLAYBACK_CHANGE_STEP, PLAYBACK_MAX_SPEED } from "src/constants/video";

const VideoPlayer: FC<VideoPlayerProps> = ({
  id,
  src,
  poster,
  muted,
  autoPlay,
  width = "78%",
  loop = false,
  controls = true,
  withPictureInPicture = false,
}) => {
  const { colorScheme } = useMantineColorScheme();
  const btnColor = colorScheme === "dark" ? "gray.2" : "gray.6";
  const videoRef = useRef<IVideoPlayerRef>(null);

  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  useEffect(() => {
    const videoInstance = new VideoService();

    if (src && videoRef.current) {
      videoInstance.loadSrc(src);
      videoInstance.attachVideo(videoRef.current);
      const videoProgress: string = StorageService.getValue(
        `videoProgress:${id}`
      );

      if (id && videoProgress && videoRef && videoRef.current) {
        videoRef.current.currentTime = parseInt(videoProgress) || 0;
      }
    }
  }, [videoRef, src, id]);

  useEffect(() => {
    if (id) {
      const handleTabClose = () => {
        if (videoRef.current) {
          StorageService.setValue(
            `videoProgress:${id}`,
            Math.floor(videoRef.current.currentTime)
          );
        }
      };

      window.addEventListener("beforeunload", handleTabClose);
      return () => {
        window.removeEventListener("beforeunload", handleTabClose);
      };
    }
  }, [id]);

  const handlePictureInPicture = async () => {
    try {
      if (videoRef.current) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!videoRef.current) return;
    switch (event.code) {
      case "ArrowUp":
        if (playbackSpeed < PLAYBACK_MAX_SPEED) {
          const newPlaybackRate = playbackSpeed + PLAYBACK_CHANGE_STEP;
          setPlaybackSpeed(newPlaybackRate);
          videoRef.current.playbackRate = newPlaybackRate;
        }
        break;
      case "ArrowDown":
        if (playbackSpeed > 0) {
          const newPlaybackRate = playbackSpeed - PLAYBACK_CHANGE_STEP;
          setPlaybackSpeed(newPlaybackRate);
          videoRef.current.playbackRate = newPlaybackRate;
        }
        break;
    }
  };

  if (src) {
    return (
      <Flex
        direction={"column"}
        align={"center"}
        gap={15}
        onKeyDown={(e: any) => handleKeyDown(e)}
      >
        <video
          data-testid={'video'}
          width={width}
          height={"auto"}
          ref={videoRef}
          autoPlay={autoPlay}
          poster={poster}
          controls={controls}
          muted={muted}
          loop={loop}
        />
        {withPictureInPicture && (
          <Flex justify={"space-between"} w={width}>
            <Group>
              <Text>current speed: {playbackSpeed}x</Text>
              <Popover width={200} position='bottom' withArrow shadow='md'>
                <Popover.Target>
                  <Button color={btnColor}>Hotkeys</Button>
                </Popover.Target>
                <Popover.Dropdown w={"220px !important"}>
                  <Text size='sm'>Arrow Up - speed + 0.25</Text>
                  <Text size='sm'>Arrow Down - speed - 0.25</Text>
                </Popover.Dropdown>
              </Popover>
            </Group>
            <Button color={btnColor} onClick={handlePictureInPicture}>
              Picture In Picture
            </Button>
          </Flex>
        )}
      </Flex>
    );
  }

  return <Image src={poster} />;
};

export default VideoPlayer;
