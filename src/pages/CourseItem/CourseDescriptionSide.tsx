import { Badge, Box, Grid, Group, Text, Timeline, Title } from "@mantine/core";
import { FC } from "react";
import Rating from "src/components/Rating/Rating";
import { getMinutes } from "src/helpers/time";
import { ICourseWithLessons } from "src/models";

const CourseDescriptionSide: FC<ICourseWithLessons> = ({
  title,
  tags,
  description,
  duration,
  rating,
  meta,
  lessons,
  containsLockedLessons,
}) => {
  return (
    <Grid.Col span={2}>
      <Title color={"gray.9"} order={4}>
        {title}
      </Title>
      <Text color={"gray.8"}>{description}</Text>

      <Group pt={10} pb={10}>
        <Rating rating={rating} />
        {tags.map((tag) => {
          return (
            <Badge key={tag} color='gray.6' radius='sm'>
              {tag}
            </Badge>
          );
        })}
      </Group>

      <Group spacing={5}>
        <Text fz={"md"} color={"gray.8"}>
          {lessons.length}
        </Text>
        <Text color={"gray.7"}>lessons in the course.</Text>
        {containsLockedLessons && (
          <Text color={"gray.7"}>{"(Contains locked lessons)"}</Text>
        )}
      </Group>

      <Group spacing={5}>
        <Text fz={"md"} color={"gray.8"}>
          {getMinutes(duration)}
        </Text>
        <Text color={"gray.7"}>minutes of content.</Text>
      </Group>
      <Box pt={20}>
        <Title order={5}>What you'll learn</Title>
        <Timeline pt={15}>
          {meta.skills.map((skill: string) => {
            return (
              <Timeline.Item
                key={skill}
                color={"gray.6"}
                title={skill}
                bulletSize={16}
              />
            );
          })}
        </Timeline>
      </Box>
    </Grid.Col>
  );
};

export default CourseDescriptionSide;
