import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const CourseCard = ({ isLessThanMd, item }) => {
  if (isLessThanMd) {
    return (
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          image={item.imageUrl}
          alt={item.description}
          title={item.title}
          sx={{ padding: "1em 1em 0 1em", width: 150, objectFit: "contain" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxHeight: 150,
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              variant="h7"
              component="div"
              sx={{
                fontWeight: "medium",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.description}
            </Typography>
          </CardContent>
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "flex-end",
              padding: "0.5em",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: "medium", mr: 0.5 }}
            >
              Enrolled:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.enrolled}
            </Typography>
          </div>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      raised
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 200,
        maxHeight: 300,
        margin: "0 auto",
        padding: "0.1em",
        mb: 2,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={item.imageUrl}
        alt={item.description}
        title={item.title}
        sx={{
          padding: "1em 1em 0 1em",
          objectFit: "contain",
        }}
      />
      <CardContent sx={{ height: "100px", overflow: "hidden" }}>
        <Typography
          variant="h7"
          component="div"
          sx={{
            fontWeight: "medium",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.description}
        </Typography>
      </CardContent>
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "flex-end",
          padding: "0.5em",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: "medium", mr: 0.5 }}
        >
          Enrolled:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.enrolled}
        </Typography>
      </div>
    </Card>
  );
};

export default CourseCard;
