import { FC } from "react";

import {
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { ReactComponent as LockIcon } from "src/assets/lock.svg";

import { Link } from "react-router-dom";
import { getMinutes } from "src/helpers/time";
import CoursePreviewMedia from "../CoursePreviewMedia/CoursePreviewMedia";
import { useHover } from "@mantine/hooks";
import Rating from "../Rating/Rating";
import { ICourse } from "src/models";

const Course: FC<ICourse> = ({
  id,
  title,
  description,
  previewImageLink,
  duration,
  lessonsCount,
  containsLockedLessons,
  rating,
  tags,
  meta,
}) => {
  const { hovered, ref } = useHover();
  const { courseVideoPreview } = meta;
  return (
    <Link
      key={id}
      to={id}
      style={{ width: "100%", textDecoration: "none", color: "inherit" }}
    >
      <Grid
        ref={ref}
        m={0}
        bg={"gray.2"}
        display={"grid"}
        w={"100%"}
        miw={"100%"}
        sx={{
          borderRadius: 5,
          gridTemplateColumns: "minmax(0, 3fr) minmax(0, 7fr)",
        }}
      >
        <Box p={5}>
          <CoursePreviewMedia
            videoSrc={courseVideoPreview?.link}
            photoSrc={previewImageLink}
            hovered={hovered}
          />
        </Box>
        <Box p={"sm"}>
          <Flex direction={"column"} gap={2}>
            <Title order={5} color={"gray.9"}>
              {title}
            </Title>

            <Text fz={"sm"} color={"gray.7"}>
              {description}
            </Text>

            <Rating rating={rating} />
            <Group>
              <Text color={"gray.7"} fz={"xs"}>
                {lessonsCount} Lessons
              </Text>
              <Center>
                <Divider size='sm' orientation='vertical' h={15} />
              </Center>

              <Text color={"gray.7"} fz={"xs"}>
                {getMinutes(duration)} minutes
              </Text>

              {containsLockedLessons ? (
                <>
                  <Center>
                    <Divider size='sm' orientation='vertical' h={15} />
                  </Center>
                  <LockIcon color={"#ADB5BD"} width={20} />
                </>
              ) : null}
            </Group>
            <Group pt={10}>
              {tags.map((tag) => (
                <Badge key={tag} color='gray' radius='sm'>
                  {tag}
                </Badge>
              ))}
            </Group>
          </Flex>
        </Box>
      </Grid>
    </Link>
  );
};

export default Course;
