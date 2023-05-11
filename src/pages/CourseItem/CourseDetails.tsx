import { Box, Grid, Title } from "@mantine/core";
import { FC } from "react";

import { ReactComponent as ArrowLeftIcon } from "src/assets/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import { Paths } from "src/constants/paths";
import CoursePreviewSide from "./CoursePreviewSide";
import CourseDescriptionSide from "./CourseDescriptionSide";
import { ICourseWithLessons } from "src/models";

const CourseDetails: FC<ICourseWithLessons> = (props) => {
  const navigate = useNavigate();
  return (
    <Box pb={80}>
      <Title color={"gray.8"}>
        <ArrowLeftIcon
          height={30}
          width={30}
          style={{ cursor: "pointer", marginTop: 10, marginRight: 15 }}
          onClick={() => {
            navigate(Paths.courses);
          }}
        />
        Course Details
      </Title>
      <Grid columns={5} pt={50}>
        <CoursePreviewSide {...props} />
        <CourseDescriptionSide {...props} />
      </Grid>
    </Box>
  );
};

export default CourseDetails;
