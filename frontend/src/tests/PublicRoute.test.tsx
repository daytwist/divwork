import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { act } from "react-dom/test-utils";
import PrivateRoute from "../components/functional/PrivateRoute";
import PublicRoute from "../components/functional/PublicRoute";
import { server } from "../mocks/server";
import SignIn from "../components/pages/SignIn";
import TeamsShow from "../components/pages/TeamsShow";
import { AuthProvider } from "../providers/AuthProvider";

describe("PublicRoute", () => {
  test("ログイン状態でPablicRouteにアクセスしない", async () => {
    server.use(
      rest.get("/auth/sessions", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            is_signed_in: true,
            current_user: {
              email: "test@example.com",
              uid: "test@example.com",
              id: 1,
              provider: "email",
              allow_password_change: false,
              name: "USER_1",
              nickname: null,
              image: null,
              team_id: 1,
            },
          })
        );
      })
    );

    render(
      <MemoryRouter initialEntries={["/sign_in"]}>
        <AuthProvider>
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
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByLabelText("メールアドレス")).not.toBeInTheDocument();
    });

    jest.useFakeTimers();
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(await screen.findByTestId("teams-show-h4")).toBeInTheDocument();
    expect(await screen.findByText("USER_2")).toBeInTheDocument();
  });
});
