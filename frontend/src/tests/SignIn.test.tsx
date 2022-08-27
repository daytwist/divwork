/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import { AuthProvider } from "../providers/AuthProvider";
import TeamsShow from "../pages/TeamsShow";
import { SnackbarProvider } from "../providers/SnackbarProvider";
import CommonLayout from "../components/CommonLayout";

describe("SignIn", () => {
  test("スナップショット", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("サインイン後の表示", async () => {
    render(
      <MemoryRouter initialEntries={["/sign_in"]}>
        <AuthProvider>
          <SnackbarProvider>
            <CommonLayout>
              <Routes>
                <Route path="/sign_in" element={<SignIn />} />
                <Route path="/teams/:id" element={<TeamsShow />} />
              </Routes>
            </CommonLayout>
          </SnackbarProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    await act(() => {
      userEvent.type(
        screen.getByLabelText("メールアドレス"),
        "test@example.com"
      );
      userEvent.type(screen.getByLabelText("パスワード"), "testtest");
      userEvent.click(screen.getByTestId("sign-in-button"));
    });

    // Headerにログインユーザー名が表示される
    expect(await screen.findByTestId("current-user-name")).toBeInTheDocument();
    // "ログインしました"メッセージが表示される
    expect(await screen.findByText("ログインしました")).toBeInTheDocument();
  });
});
