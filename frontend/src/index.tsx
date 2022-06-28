import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import SignIn from "./pages/SignIn";
import TeamsSelect from "./pages/TeamsSelect";
import TeamsShow from "./pages/TeamsShow";
import UsersShow from "./pages/UsersShow";
import TasksShow from "./pages/TasksShow";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import { AuthContext } from "./contexts";
import Home from "./pages/Home";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign_up/teams/select" element={<TeamsSelect />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/teams/:id" element={<TeamsShow />} />
        <Route path="users/:id" element={<UsersShow />} />
        <Route path="tasks/:id" element={<TasksShow />} />
      </Routes>
    </AuthContext.Provider>
    <Header />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
