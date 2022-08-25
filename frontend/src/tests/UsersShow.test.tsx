import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import { server } from "../mocks/server";
import UsersShow from "../pages/UsersShow";
import { AuthProvider } from "../providers/AuthProvider";

describe("UsersShow", () => {
  test("ユーザーのタスク一覧ページ", async () => {
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
      <MemoryRouter initialEntries={["/users/1"]}>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/users/:id" element={<UsersShow />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    // 未完了タスクのみ表示される
    expect(await screen.findByText("UNFINISHED_TASK_1")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText("FINISHED_TASK_2")).not.toBeInTheDocument();
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(screen.getByText("完了済み"));
    });

    // 完了タスクのみ表示される
    expect(await screen.findByText("FINISHED_TASK_2")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText("UNFINISHED_TASK_1")).not.toBeInTheDocument();
    });
  });
});
