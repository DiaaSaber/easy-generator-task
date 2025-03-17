import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signIn } from "../store/authSlice";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
        Sign In
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const resultAction = await dispatch(signIn(values));
          setSubmitting(false);

          if (signIn.fulfilled.match(resultAction)) {
            navigate("/welcome");
          }
        }}
      >
        {({ isSubmitting, errors, touched, handleChange }) => (
          <Form style={{ width: "300px" }}>
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
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </Form>
        )}
      </Formik>

      <Button variant="text" onClick={() => navigate("/signup")} sx={{ mt: 2 }}>
        Don't have an account? Sign Up
      </Button>
    </Box>
  );
}

export default SignInPage;
