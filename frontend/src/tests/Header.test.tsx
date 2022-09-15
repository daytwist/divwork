/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/ui/Header";
import { server } from "../mocks/server";
import { AuthProvider } from "../providers/AuthProvider";
import { SnackbarProvider } from "../providers/SnackbarProvider";

describe("Header", () => {
  test("ヘッダーメニュー", async () => {
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
              avatar: "",
            },
          })
        );
      })
    );

    render(
      <BrowserRouter>
        <AuthProvider>
          <SnackbarProvider>
            <Header />
          </SnackbarProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(await screen.findByText("USER_1")).toBeInTheDocument();

    // ユーザー名をクリックするとメニューが表示される
    expect(screen.queryByText("マイタスク")).not.toBeInTheDocument();
    await act(() => {
      userEvent.click(screen.getByText("USER_1"));
    });
    expect(screen.getByText("マイタスク")).toBeInTheDocument();
  });
});
