import { Container, Grid } from "@mui/material";
import CourseCard from "./CourseCard";

const Course = ({ isLessThanMd, lastBookElementRef, queryData }) => {
  return (
    <Container>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {queryData.length !== 0 &&
          queryData.map((item, index) => {
            if (queryData.length === index + 1) {
              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={isLessThanMd ? 12 : 2.4}
                  lg={2.4}
                  xl={2}
                  key={index}
                  ref={lastBookElementRef}
                >
                  <CourseCard isLessThanMd={isLessThanMd} item={item} />
                </Grid>
              );
            }

            return (
              <Grid
                item
                xs={12}
                sm={12}
                md={isLessThanMd ? 12 : 2.4}
                lg={2.4}
                xl={2}
                key={index}
              >
                <CourseCard isLessThanMd={isLessThanMd} item={item} />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default Course;
