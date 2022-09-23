/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { server } from "../mocks/server";
import { AuthProvider } from "../providers/AuthProvider";
import DivisionsNew from "../components/pages/DivisionsNew";
import UsersShow from "../components/pages/UsersShow";
import { SnackbarProvider } from "../providers/SnackbarProvider";
import CommonLayout from "../components/ui/CommonLayout";

describe("DivisionsNew", () => {
  test("分担作成ページ", async () => {
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
      <MemoryRouter initialEntries={["/tasks/1/divisions/new"]}>
        <AuthProvider>
          <SnackbarProvider>
            <CommonLayout>
              <Routes>
                <Route path="/users/:id" element={<UsersShow />} />
                <Route
                  path="/tasks/:id/divisions/new"
                  element={<DivisionsNew />}
                />
              </Routes>
            </CommonLayout>
          </SnackbarProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // タスクが表示される
    expect(await screen.findByDisplayValue("TASK_3")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText("USER_2")).not.toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByLabelText("分担先ユーザー"));
    });

    // チームメンバーが表示される
    expect(await screen.findByText("USER_2")).toBeInTheDocument();

    await act(() => {
      userEvent.click(screen.getByText("USER_2"));
      userEvent.type(screen.getByLabelText("分担コメント"), "Thank you");
      userEvent.click(screen.getByTestId("send-button"));
    });

    // UsersShowページに遷移する
    expect(await screen.findByTestId("users-show-h4")).toBeInTheDocument();
    expect(
      await screen.findByText("分担タスクを送信しました")
    ).toBeInTheDocument();
  }, 8000);
});
