import { useState } from "react";
import {
  Autocomplete,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../services/auth";
import { StyledErrorTypo } from "../styled/typo";
import { authError } from "../consts/authError";
import { emailRegex } from "../utils/regex";
import { isEmpty } from "../utils/validate";
import {
  isDefaultError,
  isInvalidEmailError,
  isInvalidPwdError,
  isInvalidRoleError,
} from "../utils/auth/authValidate";
import paths from "../consts/paths";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    roleId: null,
    roleName: null,
  });
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOptionChange = (event, newValue) => {
    let roleId;
    switch (newValue) {
      case null:
        roleId = null;
        break;
      case "Instructor":
        roleId = 2;
        break;
      default:
        roleId = 1;
    }

    setFormData({
      ...formData,
      roleId: roleId,
      roleName: newValue,
    });
  };

  const handleSubmit = async () => {
    if (!emailRegex.test(formData.email)) {
      return setError({
        isError: true,
        message: authError.invalidEmailMsg,
      });
    }
    if (isEmpty(formData.password)) {
      return setError({
        isError: true,
        message: authError.invalidPwdMsg,
      });
    }
    if (isEmpty(formData.roleId)) {
      return setError({
        isError: true,
        message: authError.invalidRoleMsg,
      });
    }

    const data = await authServices.register(formData);
    if (!data.error) {
      return navigate(paths.dashboard);
    }

    setError({
      isError: true,
      message: authError.defaultErrorMsg,
    });
  };

  return (
    <StyledRegisterContainer>
      <StyledRegisterPaper>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <TextField
          fullWidth
          error={isInvalidEmailError(error)}
          helperText={isInvalidEmailError(error) && authError.invalidEmailMsg}
          label="Email"
          variant="outlined"
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          error={isInvalidPwdError(error)}
          helperText={isInvalidPwdError(error) && authError.invalidPwdMsg}
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Autocomplete
          fullWidth
          options={["Student", "Instructor"]}
          value={formData.roleName}
          onChange={handleOptionChange}
          renderInput={(params) => (
            <TextField
              {...params}
              error={isInvalidRoleError(error)}
              helperText={isInvalidRoleError(error) && authError.invalidPwdMsg}
              label="Choose an option"
              variant="outlined"
              margin="normal"
            />
          )}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2, mb: 3 }}
        >
          Submit
        </Button>
        <Link to={paths.root}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={null}
            sx={{ mb: 3 }}
          >
            Back to Login
          </Button>
        </Link>
        {isDefaultError(error) && (
          <StyledErrorTypo>{error.message}</StyledErrorTypo>
        )}
      </StyledRegisterPaper>
    </StyledRegisterContainer>
  );
};

export default Register;

const StyledRegisterContainer = styled(Container)({
  display: "grid",
  placeContent: "center",
  height: "100vh",
  maxWidth: "xs",
});

const StyledRegisterPaper = styled(Paper)({
  elevation: 3,
  padding: "20px",
});
