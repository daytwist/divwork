/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CommonLayout from "../components/CommonLayout";
import { server } from "../mocks/server";
import TasksShow from "../pages/TasksShow";
import UsersShow from "../pages/UsersShow";
import { AuthProvider } from "../providers/AuthProvider";
import { SnackbarProvider } from "../providers/SnackbarProvider";

describe("TasksShow", () => {
  test("タスク詳細ページ", async () => {
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
      <MemoryRouter initialEntries={["/tasks/1"]}>
        <AuthProvider>
          <SnackbarProvider>
            <CommonLayout>
              <Routes>
                <Route path="/tasks/:id" element={<TasksShow />} />
                <Route path="/users/:id" element={<UsersShow />} />
              </Routes>
            </CommonLayout>
          </SnackbarProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // タスクのタイトルが表示されている
    expect(await screen.findByText("TASK_1")).toBeInTheDocument();

    await act(() => {
      userEvent.click(screen.getByTestId("delete-button"));
    });

    // 削除確認ダイアログが開く
    expect(
      await screen.findByText("タスクを削除しますか？")
    ).toBeInTheDocument();

    await act(() => {
      userEvent.click(screen.getByRole("button", { name: "削除する" }));
    });

    expect(await screen.findByText("タスクを削除しました")).toBeInTheDocument();

    // ユーザー詳細ページに遷移する
    expect(await screen.findByText("USER_1のタスク")).toBeInTheDocument();

    // 削除したタスクは表示されていない
    await waitFor(() => {
      expect(screen.queryByText("TASK_1")).not.toBeInTheDocument();
    });
  });
});
