import { FC, StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import CommonLayout from "./components/ui/CommonLayout";
import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import TeamsSelect from "./components/pages/TeamsSelect";
import TeamsNew from "./components/pages/TeamsNew";
import TeamsShow from "./components/pages/TeamsShow";
import TeamsEdit from "./components/pages/TeamsEdit";
import UsersShow from "./components/pages/UsersShow";
import UsersEdit from "./components/pages/UsersEdit";
import TasksShow from "./components/pages/TasksShow";
import TasksNew from "./components/pages/TasksNew";
import DivisionsNew from "./components/pages/DivisionsNew";
import TasksEdit from "./components/pages/TasksEdit";
import PrivateRoute from "./components/functional/PrivateRoute";
import PublicRoute from "./components/functional/PublicRoute";
import AdminRoute from "./components/functional/AdminRoute";
import NormalUserRoute from "./components/functional/NormalUserRoute";
import NotFound from "./components/pages/NotFound";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App: FC = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <SnackbarProvider>
            <CommonLayout>
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
                  path="/sign_up/teams/new"
                  element={
                    <PublicRoute>
                      <TeamsNew />
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
                  path="/teams"
                  element={
                    <PrivateRoute>
                      <TeamsShow />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/teams/edit"
                  element={
                    <AdminRoute>
                      <TeamsEdit />
                    </AdminRoute>
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
                <Route
                  path="users/:id/edit"
                  element={
                    <NormalUserRoute>
                      <UsersEdit />
                    </NormalUserRoute>
                  }
                />
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CommonLayout>
          </SnackbarProvider>
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
