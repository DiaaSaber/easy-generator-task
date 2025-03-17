import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signUp } from "../store/authSlice";

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Za-z]/, "Must contain at least one letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Must contain at least one special character")
    .required("Required"),
});

function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Pull these from Redux
  const { loading, error } = useAppSelector((state) => state.auth);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" marginBottom={2}>
        Sign Up
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={SignUpSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const resultAction = await dispatch(signUp(values));
          setSubmitting(false);

          if (signUp.fulfilled.match(resultAction)) {
            navigate("/welcome");
          }
        }}
      >
        {({ isSubmitting, errors, touched, handleChange }) => (
          <Form style={{ width: "300px" }}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={<ErrorMessage name="name" />}
            />

            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={<ErrorMessage name="email" />}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={<ErrorMessage name="password" />}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting || loading}
              sx={{ mt: 2 }}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </Form>
        )}
      </Formik>

      <Button variant="text" onClick={() => navigate("/signin")} sx={{ mt: 2 }}>
        Already have an account? Sign In
      </Button>
    </Box>
  );
}

export default SignUpPage;
