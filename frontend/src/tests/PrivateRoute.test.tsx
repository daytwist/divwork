import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
import SignIn from "../pages/SignIn";
import TeamsShow from "../pages/TeamsShow";

describe("PrivateRoute", () => {
  test("ログインしていない状態でPrivateRouteにアクセスしない", async () => {
    render(
      <MemoryRouter initialEntries={["/teams/1"]}>
        <Routes>
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
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.queryByText("Teams#Show")).not.toBeInTheDocument();
    });
    expect(await screen.findByLabelText("メールアドレス")).toBeInTheDocument();
  });
});
