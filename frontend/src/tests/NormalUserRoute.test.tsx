import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { NormalUserRoute } from "../components/functional/NormalUserRoute";
import { UsersEdit } from "../components/pages/UsersEdit";
import { UsersShow } from "../components/pages/UsersShow";
import { CommonLayout } from "../components/ui/CommonLayout";
import { server } from "../mocks/server";
import { AuthProvider } from "../providers/AuthProvider";
import { SnackbarProvider } from "../providers/SnackbarProvider";

describe("NormalUserRoute", () => {
  test("ゲストユーザーはアクセス出来ない", async () => {
    server.use(
      rest.get("/auth/sessions", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            is_signed_in: true,
            current_user: {
              email: "guest@example.com",
              uid: "guest@example.com",
              id: 1,
              provider: "email",
              allow_password_change: false,
              name: "ゲスト",
              nickname: null,
              image: null,
              team_id: 1,
              admin: false,
            },
          })
        );
      })
    );

    server.use(
      rest.get("/users/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            user: {
              id: 1,
              provider: "email",
              uid: "guest@example.com",
              allow_password_change: false,
              name: "ゲスト",
              nickname: null,
              image: null,
              email: "guest@example.com",
              team_id: 1,
              created_at: "2022-06-05T10:16:09.882+09:00",
              updated_at: "2022-06-05T10:16:09.882+09:00",
              avatar: "",
              admin: false,
            },
            unfinished_tasks: [],
            finished_tasks: [],
          })
        );
      })
    );

    server.use(
      rest.get("/users/:id/edit", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            user: {
              id: 1,
              provider: "email",
              uid: "guest@example.com",
              allow_password_change: false,
              name: "ゲスト",
              nickname: null,
              image: null,
              email: "guest@example.com",
              team_id: 1,
              created_at: "2022-06-05T10:16:09.882+09:00",
              updated_at: "2022-06-05T10:16:09.882+09:00",
              avatar: "",
              admin: false,
            },
          })
        );
      })
    );

    render(
      <MemoryRouter initialEntries={["/users/1/edit"]}>
        <AuthProvider>
          <SnackbarProvider>
            <CommonLayout>
              <Routes>
                <Route path="/users/:id" element={<UsersShow />} />
                <Route
                  path="/users/:id/edit"
                  element={
                    <NormalUserRoute>
                      <UsersEdit />
                    </NormalUserRoute>
                  }
                />
              </Routes>
            </CommonLayout>
          </SnackbarProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    jest.useFakeTimers();
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(screen.queryByText("アカウント設定")).not.toBeInTheDocument();
    });
    expect(await screen.findByTestId("users-show-h4")).toBeInTheDocument();
  }, 8000);
});
