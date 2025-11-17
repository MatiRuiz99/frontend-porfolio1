import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";

import MainNavigation from "./components/Header/MainNavigation/MainNavigation";
import { AuthContext } from "./components/Elements/Context/auth-context";
import { useAuth } from "./components/Elements/Hook/auth-hook";
import LoadingSpinner from "./components/Elements/Loading/LoadingSpinner";

const User = lazy(() => import("./components/user/Users"));
const UserPosts = lazy(() => import("./components/posts/userPosts"));
const NewPost = lazy(() => import("./components/posts/NewPost/NewPost"));
const UpdatePost = lazy(() => import("./components/posts/UpdatePost/UpdatePost"));
const Auth = lazy(() => import("./components/Elements/Auth/Auth"));

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <>
        <Route path="/" element={<User />} />
        <Route path="/posts/new" element={<NewPost />} />
        <Route path="/:userId/posts" element={<UserPosts />} />
        <Route path="/post/:postId" element={<UpdatePost />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<User />} />
        <Route path="/:userId/posts" element={<UserPosts />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        login,
        logout,
      }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            <Routes>{routes}</Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
