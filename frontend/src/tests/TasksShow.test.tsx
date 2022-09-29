/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { server } from "../mocks/server";
import TasksShow from "../components/pages/TasksShow";
import UsersShow from "../components/pages/UsersShow";
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
            <Routes>
              <Route path="/tasks/:id" element={<TasksShow />} />
              <Route path="/users/:id" element={<UsersShow />} />
            </Routes>
          </SnackbarProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // タスクのタイトルが表示されている
    expect(await screen.findByText("TASK_2")).toBeInTheDocument();

    act(() => {
      userEvent.click(screen.getByTestId("parent-task-details"));
    });

    // 分担作成ユーザーと親タスクユーザーが表示されている
    expect(await screen.findByTestId("division-user-name")).toBeInTheDocument();
    expect(
      await screen.findByTestId("parent-task-user-name")
    ).toBeInTheDocument();

    act(() => {
      userEvent.click(screen.getByTestId("children-tasks-details"));
    });

    // 分担作成ユーザーと子タスクユーザーが表示されている
    expect(await screen.findByText("USER_3")).toBeInTheDocument();
    expect(await screen.findByText("USER_4")).toBeInTheDocument();

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

    // ユーザー詳細ページに遷移する
    expect(await screen.findByTestId("users-show-page")).toBeInTheDocument();

    // 削除したタスクは表示されていない
    await waitFor(() => {
      expect(screen.queryByText("TASK_2")).not.toBeInTheDocument();
    });
  }, 8000);
});
