import { BrowserRouter, Routes, Route } from "react-router-dom";
import { css, Global } from "@emotion/react";
import { Box } from "@mui/material";
import { AuthProvider } from "./providers/AuthProvider";
import Home from "./pages/Home";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import TeamsSelect from "./pages/TeamsSelect";
import TeamsShow from "./pages/TeamsShow";
import UsersShow from "./pages/UsersShow";
import UsersEdit from "./pages/UsersEdit";
import TasksShow from "./pages/TasksShow";
import TasksNew from "./pages/TasksNew";
import DivisionsNew from "./pages/DivisionsNew";
import TasksEdit from "./pages/TasksEdit";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const App: React.FC = () => {
  const global = css`
    * {
      margin: 0;
    }
  `;

  return (
    <BrowserRouter>
      <Global styles={global} />
      <AuthProvider>
        <Header />
        <Box m={2} pt={3}>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            />
            <Route
              path="/sign_up/teams/select"
              element={
                <PublicRoute>
                  <TeamsSelect />
                </PublicRoute>
              }
            />
            <Route
              path="/sign_up"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route
              path="/sign_in"
              element={
                <PublicRoute>
                  <SignIn />
                </PublicRoute>
              }
            />
            <Route
              path="/teams/:id"
              element={
                <PrivateRoute>
                  <TeamsShow />
                </PrivateRoute>
              }
            />
            <Route
              path="users/:id"
              element={
                <PrivateRoute>
                  <UsersShow />
                </PrivateRoute>
              }
            />
            <Route path="users/:id/edit" element={<UsersEdit />} />
            <Route
              path="/tasks/new"
              element={
                <PrivateRoute>
                  <TasksNew />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/:id"
              element={
                <PrivateRoute>
                  <TasksShow />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/:id/edit"
              element={
                <PrivateRoute>
                  <TasksEdit />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/:id/divisions/new"
              element={
                <PrivateRoute>
                  <DivisionsNew />
                </PrivateRoute>
              }
            />
          </Routes>
        </Box>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
