import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import TeamsSelect from "./components/pages/TeamsSelect";
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
import CommonLayout from "./components/ui/CommonLayout";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import NormalUserRoute from "./components/functional/NormalUserRoute";

const App: React.FC = () => {
  return (
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
                path="/teams/:id/edit"
                element={
                  <PrivateRoute>
                    <AdminRoute>
                      <TeamsEdit />
                    </AdminRoute>
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
              <Route
                path="users/:id/edit"
                element={
                  <PrivateRoute>
                    <NormalUserRoute>
                      <UsersEdit />
                    </NormalUserRoute>
                  </PrivateRoute>
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
            </Routes>
          </CommonLayout>
        </SnackbarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
