import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Assuming you have a login function in your auth context
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          values
        );
        login(response.data.token, JSON.stringify(response.data.user));
        navigate('/group');
      } catch (err) {
        setError(err.response?.data?.message || "Login failed");
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={isPasswordVisible ? "text" : "password"}
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {!isPasswordVisible ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        <Typography sx={{ mt: 2 }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
