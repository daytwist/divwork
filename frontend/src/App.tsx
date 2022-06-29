import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import TeamsSelect from "./pages/TeamsSelect";
import TeamsShow from "./pages/TeamsShow";
import UsersShow from "./pages/UsersShow";
import TasksShow from "./pages/TasksShow";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Home from "./pages/Home";
import { AuthProvider } from "./components/AuthProvider";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign_up/teams/select" element={<TeamsSelect />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/teams/:id" element={<TeamsShow />} />
          <Route path="users/:id" element={<UsersShow />} />
          <Route path="tasks/:id" element={<TasksShow />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
