import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { act } from "react-dom/test-utils";
import CommonLayout from "../components/ui/CommonLayout";
import { server } from "../mocks/server";
import { AuthProvider } from "../providers/AuthProvider";
import { SnackbarProvider } from "../providers/SnackbarProvider";
import TasksEdit from "../components/pages/TasksEdit";
import TeamsShow from "../components/pages/TeamsShow";

describe("TasksEdit", () => {
  test("タスク編集ページのアクセス制限", async () => {
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
    server.use(
      rest.get("/tasks/2/edit", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            messages: "アクセス権限がありません",
          })
        );
      })
    );

    render(
      <MemoryRouter initialEntries={["/tasks/2/edit"]}>
        <AuthProvider>
          <SnackbarProvider>
            <CommonLayout>
              <Routes>
                <Route path="/tasks/:id/edit" element={<TasksEdit />} />
                <Route path="/teams" element={<TeamsShow />} />
              </Routes>
            </CommonLayout>
          </SnackbarProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    jest.useFakeTimers();
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.queryByText("TASK_2")).not.toBeInTheDocument();
    });
    expect(await screen.findByTestId("teams-show-h4")).toBeInTheDocument();
  });
});
