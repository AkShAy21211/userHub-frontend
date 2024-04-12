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
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/layout/Layout";
import Post from "./components/post/Post";

const HomePage = lazy(() => import("./pages/HomePage"));

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(authenticate());
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          element={
            user ? (
              <ErrorBoundary fallback={<h2>Error occurred</h2>}>
                <Layout>
                  <Suspense fallback={<h2></h2>}>
                    <HomePage />
                  </Suspense>
                </Layout>
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
            user ?
            <Layout>
             <ProfilePage /> 
            </Layout>
             : <Navigate to="/login" replace={true} />
          }
          path="/profile"
        />
         <Route
          element={
            user ?
            <Layout>
             <Post /> 
            </Layout>
             : <Navigate to="/login" replace={true} />
          }
          path="/create"
        />
      </Routes>
    </Router>
  );
};

export default App;
