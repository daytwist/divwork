import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AdminRoute from "../components/functional/AdminRoute";
import TeamsEdit from "../components/pages/TeamsEdit";
import TeamsShow from "../components/pages/TeamsShow";
import CommonLayout from "../components/ui/CommonLayout";
import { server } from "../mocks/server";
import { AuthProvider } from "../providers/AuthProvider";
import { SnackbarProvider } from "../providers/SnackbarProvider";

describe("AdminRoute", () => {
  test("管理者以外はアクセス出来ない", async () => {
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
              admin: false,
            },
          })
        );
      })
    );

    render(
      <MemoryRouter initialEntries={["/teams/edit"]}>
        <AuthProvider>
          <SnackbarProvider>
            <CommonLayout>
              <Routes>
                <Route path="/teams" element={<TeamsShow />} />
                <Route
                  path="/teams/edit"
                  element={
                    <AdminRoute>
                      <TeamsEdit />
                    </AdminRoute>
                  }
                />
              </Routes>
            </CommonLayout>
          </SnackbarProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("チーム設定")).not.toBeInTheDocument();
    });
    expect(await screen.findByTestId("teams-show-h4")).toBeInTheDocument();
  });
});
