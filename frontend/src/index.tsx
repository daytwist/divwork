import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SignIn from "./pages/SignIn";
import SelectTeam from "./pages/Teams";
import ShowTeam from "./pages/Team";
import ShowUser from './pages/User';
import ShowTask from './pages/Task';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/sign_up/teams/select" element={<SelectTeam />} />
      <Route path="/sign_in" element={<SignIn />} />
      <Route path="/teams/:id" element={<ShowTeam />} />
      <Route path="users/:id" element={<ShowUser />} />
      <Route path="tasks/:id" element={<ShowTask />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
