import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/functional/PrivateRoute";
import PublicRoute from "../components/functional/PublicRoute";
import SignIn from "../components/pages/SignIn";
import TeamsShow from "../components/pages/TeamsShow";

describe("PrivateRoute", () => {
  test("ログインしていない状態でPrivateRouteにアクセスしない", async () => {
    render(
      <MemoryRouter initialEntries={["/teams"]}>
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
            path="/teams"
            element={
              <PrivateRoute>
                <TeamsShow />
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    jest.useFakeTimers();
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(screen.queryByTestId("teams-show-h4")).not.toBeInTheDocument();
    });
    expect(await screen.findByLabelText("メールアドレス")).toBeInTheDocument();
  });
});
