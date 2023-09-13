import { useState } from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../services/auth";
import { StyledErrorTypo } from "../styled/typo";
import { authError } from "../consts/authError";
import { emailRegex } from "../utils/regex";
import {
  isDefaultError,
  isInvalidEmailError,
  isInvalidPwdError,
} from "../utils/auth/authValidate";
import { isEmpty } from "../utils/validate";
import paths from "../consts/paths";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const handleLogin = async () => {
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

    const data = await authServices.login(formData);
    if (!data.error) {
      return navigate(paths.dashboard);
    }

    setError({
      isError: true,
      message: authError.defaultErrorMsg,
    });
  };

  return (
    <StyledLoginContainer>
      <StyledLoginPaper>
        <Typography variant="h5" gutterBottom>
          CourseKub
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
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mt: 2, mb: 3 }}
        >
          Login
        </Button>
        <Link to={paths.register}>
          <Button fullWidth variant="outlined" color="primary" sx={{ mb: 3 }}>
            Register
          </Button>
        </Link>
        {isDefaultError(error) && (
          <StyledErrorTypo>{error.message}</StyledErrorTypo>
        )}
      </StyledLoginPaper>
    </StyledLoginContainer>
  );
};

export default Login;

const StyledLoginContainer = styled(Container)({
  display: "grid",
  placeContent: "center",
  height: "100vh",
  maxWidth: "xs",
});

const StyledLoginPaper = styled(Paper)({
  elevation: 3,
  padding: "20px",
});
