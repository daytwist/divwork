/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CommonLayout from "../components/CommonLayout";
import { server } from "../mocks/server";
import Home from "../pages/Home";
import UsersEdit from "../pages/UsersEdit";
import UsersShow from "../pages/UsersShow";
import { AuthProvider } from "../providers/AuthProvider";
import { SnackbarProvider } from "../providers/SnackbarProvider";

describe("UsersEdit", () => {
  test("ユーザー情報更新", async () => {
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
      <MemoryRouter initialEntries={["/users/1/edit"]}>
        <AuthProvider>
          <SnackbarProvider>
            <CommonLayout>
              <Routes>
                <Route path="/users/:id" element={<UsersShow />} />
                <Route path="/users/:id/edit" element={<UsersEdit />} />
              </Routes>
            </CommonLayout>
          </SnackbarProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // ユーザー情報が表示されている
    expect(await screen.findByDisplayValue("USER_1")).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue("test@example.com")
    ).toBeInTheDocument();

    await act(() => {
      userEvent.type(screen.getByLabelText("ユーザー名"), "USER_UPDATE");
      userEvent.type(
        screen.getByLabelText("メールアドレス"),
        "update@example.com"
      );
      userEvent.click(screen.getByText("更新する"));
    });

    // 更新するとUsersShowページへ遷移する
    expect(await screen.findByTestId("users-show-h4")).toBeInTheDocument();
    expect(
      await screen.findByText("ユーザー情報を更新しました")
    ).toBeInTheDocument();
  });

  test("アカウント削除", async () => {
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
      <MemoryRouter initialEntries={["/users/1/edit"]}>
        <AuthProvider>
          <SnackbarProvider>
            <CommonLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users/:id/edit" element={<UsersEdit />} />
              </Routes>
            </CommonLayout>
          </SnackbarProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // ユーザー情報が表示されている
    expect(await screen.findByDisplayValue("USER_1")).toBeInTheDocument();

    await act(() => {
      userEvent.click(screen.getByRole("button", { name: "アカウント削除" }));
    });

    // 削除確認ダイアログが開く
    expect(
      await screen.findByText("アカウントを削除しますか？")
    ).toBeInTheDocument();

    await act(() => {
      userEvent.click(screen.getByRole("button", { name: "削除する" }));
    });

    expect(
      await screen.findByText(
        "アカウントを削除しました。またのご利用をお待ちしております。"
      )
    ).toBeInTheDocument();

    // ホームに遷移する
    expect(await screen.findByTestId("home-title")).toBeInTheDocument();
  });
});
