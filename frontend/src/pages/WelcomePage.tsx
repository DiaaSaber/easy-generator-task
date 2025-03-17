import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearAuth, fetchUserProfile } from "../store/authSlice";

function WelcomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/signin");
    } else {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, navigate]);

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/signin");
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h5" color="error" gutterBottom>
          {error}
        </Typography>
        <Button variant="contained" onClick={handleLogout}>
          Log Out
        </Button>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" marginBottom={2}>
        Welcome to the new application, {user?.name}!
      </Typography>
      <Button variant="outlined" onClick={handleLogout}>
        Log Out
      </Button>
    </Box>
  );
}

export default WelcomePage;
