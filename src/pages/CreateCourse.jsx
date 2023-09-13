import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import { StyledErrorTypo } from "../styled/typo";
import { courseError } from "../consts/courseError";
import { isEmpty } from "../utils/validate";
import {
  isDefaultError,
  isInvalidCategoryError,
  isInvalidDescError,
  isInvalidSubjectError,
  isInvalidTitleError,
} from "../utils/course/createCourseValidate";
import DashboardAppBar from "../layouts/DashboardAppBar";
import courseServices from "../services/course";
import { useNavigate } from "react-router-dom";
import paths from "../consts/paths";

const CreateCourse = () => {
  const navigate = useNavigate();
  const isLessThanMd = useMediaQuery("(max-width: 960px)");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    subject: "",
    imageFileName: "Press Upload",
  });
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFormData({
        ...formData,
        imageFileName: file.name,
      });

      // TODO: Upload to cloud storage
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (isEmpty(formData.title)) {
      return setError({
        isError: true,
        message: courseError.invalidTitleMsg,
      });
    }
    if (isEmpty(formData.description)) {
      return setError({
        isError: true,
        message: courseError.invalidDescMsg,
      });
    }
    if (isEmpty(formData.category)) {
      return setError({
        isError: true,
        message: courseError.invalidCategoryMsg,
      });
    }
    if (isEmpty(formData.subject)) {
      return setError({
        isError: true,
        message: courseError.invalidSubjectMsg,
      });
    }

    // call services
    const data = await courseServices.createCourse(formData);
    if (!data.error) {
      return navigate(paths.dashboard);
    }

    setError({
      isError: true,
      message: courseError.defaultErrorMsg,
    });
  };

  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{ overflowY: "auto", maxHeight: "100vh" }}
    >
      <DashboardAppBar isLessThanMd={isLessThanMd} />
      <StyledCreateCourseContainer>
        <StyledCreateCoursePaper>
          <Typography variant="h5" gutterBottom>
            Create Course
          </Typography>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="image-upload"
            type="file"
            onChange={handleImageChange}
          />
          {selectedImage && (
            <div>
              <img
                src={selectedImage}
                alt="Selected"
                style={{
                  maxHeight: "200px",
                  maxWidth: "200px",
                  marginTop: "10px",
                }}
              />
            </div>
          )}
          <label
            htmlFor="image-upload"
            style={{ display: "flex", marginTop: "3vh" }}
          >
            <TextField
              disabled
              id="outlined-disabled"
              label="Course Banner"
              value={formData.imageFileName}
              sx={{ mr: 2, width: "100%" }}
            />
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
          <TextField
            fullWidth
            error={isInvalidTitleError(error)}
            helperText={
              isInvalidTitleError(error) && courseError.invalidTitleMsg
            }
            label="Title"
            variant="outlined"
            margin="normal"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            error={isInvalidDescError(error)}
            helperText={isInvalidDescError(error) && courseError.invalidDescMsg}
            label="Description"
            variant="outlined"
            margin="normal"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            error={isInvalidCategoryError(error)}
            helperText={
              isInvalidCategoryError(error) && courseError.invalidCategoryMsg
            }
            label="Category"
            variant="outlined"
            margin="normal"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            error={isInvalidSubjectError(error)}
            helperText={
              isInvalidSubjectError(error) && courseError.invalidSubjectMsg
            }
            label="Subject"
            variant="outlined"
            margin="normal"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2, mb: 3 }}
          >
            Create Course
          </Button>
          {isDefaultError(error) && (
            <StyledErrorTypo>{error.message}</StyledErrorTypo>
          )}
        </StyledCreateCoursePaper>
      </StyledCreateCourseContainer>
    </Container>
  );
};

export default CreateCourse;

const StyledCreateCourseContainer = styled(Container)({
  display: "grid",
  maxWidth: "xs",
  marginTop: "5vh",
  marginBottom: "15vh",
});

const StyledCreateCoursePaper = styled(Paper)({
  elevation: 3,
  padding: "20px",
});
