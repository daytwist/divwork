/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CommonLayout from "../components/ui/CommonLayout";
import { server } from "../mocks/server";
import { AuthProvider } from "../providers/AuthProvider";
import { SnackbarProvider } from "../providers/SnackbarProvider";
import TeamsShow from "../components/pages/TeamsShow";
import TeamsEdit from "../components/pages/TeamsEdit";

describe("TeamsEdit", () => {
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
            admin: true,
          },
        })
      );
    })
  );

  test("チーム情報更新", async () => {
    render(
      <MemoryRouter initialEntries={["/teams/1/edit"]}>
        <AuthProvider>
          <SnackbarProvider>
            <CommonLayout>
              <Routes>
                <Route path="/teams/:id" element={<TeamsShow />} />
                <Route path="/teams/:id/edit" element={<TeamsEdit />} />
              </Routes>
            </CommonLayout>
          </SnackbarProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // チーム情報が表示されている
    expect(await screen.findByDisplayValue("TEAM_1")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("10")).toBeInTheDocument();

    await act(() => {
      userEvent.clear(screen.getByLabelText("チーム名"));
      userEvent.type(screen.getByLabelText("チーム名"), "TEAM_UPDATE");
      userEvent.click(screen.getByRole("button", { name: "更新する" }));
    });

    // 更新するとTeamsShowページへ遷移する
    expect(await screen.findByText("teams-show-h4")).toBeInTheDocument();
    expect(
      await screen.findByText("チーム情報を更新しました")
    ).toBeInTheDocument();
  });
});
