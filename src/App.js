import React, { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "./app/features/user/userSlice";
import ProfilePage from "./pages/ProfilePage"
const HomePage = lazy(() => import("./pages/HomePage"));

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state1) => state1.auth.user);
  useEffect(() => {
    dispatch(authenticate());
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          element={
            user ? (
              <ErrorBoundary fallback={<h2>error occured</h2>}>
                <Suspense fallback={<h2>Loading</h2>}>
                  <HomePage />
                </Suspense>
              </ErrorBoundary>
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
          path="/"
        />

        <Route
          element={!user ? <LoginPage /> : <Navigate to="/" replace={true} />}
          path="/login"
        />

        <Route
          element={
            !user ? <RegisterPage /> : <Navigate to="/" replace={true} />
          }
          path="/register"
        />
         <Route
          element={
            user ? <ProfilePage /> : <Navigate to="/login" replace={true} />
          }
          path="/profile"
        />
      </Routes>
    </Router>
  );
};

export default App;
