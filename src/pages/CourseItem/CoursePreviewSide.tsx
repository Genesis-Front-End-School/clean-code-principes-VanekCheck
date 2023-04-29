import { Badge, Flex, Grid, Group } from "@mantine/core";
import { FC } from "react";
import VideoPlayer from "src/components/VideoPlayer/VideoPlayer";
import { convertToLocalDateString } from "src/helpers/time";
import { ICourseWithLessons } from "src/models";

const CoursePreviewSide: FC<ICourseWithLessons> = ({
  launchDate,
  status,
  meta,
}) => {
  const { courseVideoPreview } = meta;

  return (
    <Grid.Col span={3}>
      <Group p={10}>
        <Flex w={"100%"} justify={"space-between"}>
          <Badge
            color={status === "launched" ? "green" : "gray"}
            radius='sm'
            size={"lg"}
          >
            {status}
          </Badge>
          <Badge color='gray' radius='sm' size={"lg"}>
            at {convertToLocalDateString(launchDate)}
          </Badge>
        </Flex>
        <VideoPlayer
          src={courseVideoPreview.link}
          poster={`${courseVideoPreview.previewImageLink}/preview.webp`}
          width={"100%"}
        />
      </Group>
    </Grid.Col>
  );
};

export default CoursePreviewSide;
