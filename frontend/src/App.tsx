import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import TeamsSelect from "./pages/TeamsSelect";
import TeamsShow from "./pages/TeamsShow";
import UsersShow from "./pages/UsersShow";
import UsersEdit from "./pages/UsersEdit";
import UsersShowFinished from "./pages/UsersShowFinished";
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
import CommonLayout from "./components/CommonLayout";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
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
              path="users/:id"
              element={
                <PrivateRoute>
                  <UsersShow />
                </PrivateRoute>
              }
            />
            <Route
              path="users/:id/finished"
              element={
                <PrivateRoute>
                  <UsersShowFinished />
                </PrivateRoute>
              }
            />
            <Route
              path="users/:id/edit"
              element={
                <PrivateRoute>
                  <UsersEdit />
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
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
