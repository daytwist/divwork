/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { rest } from "msw";
import { Home } from "../components/pages/Home";
import { AuthProvider } from "../providers/AuthProvider";
import { SnackbarProvider } from "../providers/SnackbarProvider";
import { CommonLayout } from "../components/ui/CommonLayout";
import { TeamsShow } from "../components/pages/TeamsShow";
import { server } from "../mocks/server";

describe("Home", () => {
  test("スナップショット", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("ゲストログイン", async () => {
    server.use(
      rest.get("/auth/sessions", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            is_signed_in: true,
            current_user: {
              email: "guest@example.com",
              uid: "guest@example.com",
              id: 3,
              provider: "email",
              allow_password_change: false,
              name: "ゲスト",
              nickname: null,
              image: null,
              team_id: 1,
            },
          })
        );
      })
    );

    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthProvider>
          <SnackbarProvider>
            <CommonLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/teams" element={<TeamsShow />} />
              </Routes>
            </CommonLayout>
          </SnackbarProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // eslint-disable-next-line @typescript-eslint/await-thenable
    await act(() => {
      userEvent.click(
        screen.getByRole("button", { name: "ゲストユーザーでログイン" })
      );
    });

    // チーム一覧ページに遷移する
    expect(await screen.findByTestId("teams-show-h4")).toBeInTheDocument();
    expect(
      await screen.findByText("ゲストログインしました")
    ).toBeInTheDocument();
  });
});
