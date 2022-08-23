import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import { server } from "../mocks/server";
import UsersEdit from "../pages/UsersEdit";
import UsersShow from "../pages/UsersShow";
import { AuthProvider } from "../providers/AuthProvider";

describe("UsersEdit", () => {
  test("ユーザー情報編集ページ", async () => {
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
          <Header />
          <Routes>
            <Route path="/users/:id" element={<UsersShow />} />
            <Route path="/users/:id/edit" element={<UsersEdit />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    // ユーザー情報が表示されている
    expect(await screen.findByDisplayValue("USER_1")).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue("test@example.com")
    ).toBeInTheDocument();

    const nameInput = screen.getByLabelText("ユーザー名");
    const emailInput = screen.getByLabelText("メールアドレス");
    const updateButton = screen.getByText("更新する");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(nameInput, "USER_UPDATE");
      userEvent.type(emailInput, "update@example.com");
      userEvent.click(updateButton);
    });

    // 更新するとUsersShowページへ遷移する
    expect(await screen.findByTestId("users-show-h4")).toBeInTheDocument();
  });
});
