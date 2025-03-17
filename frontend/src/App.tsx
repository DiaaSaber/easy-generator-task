import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import WelcomePage from "./pages/WelcomePage";

const isAuthenticated = () => {
  return Boolean(localStorage.getItem("token"));
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />

      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />

      <Route
        path="/welcome"
        element={
          isAuthenticated() ? <WelcomePage /> : <Navigate to="/signin" />
        }
      />

      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  );
}

export default App;
