import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer"; // eslint-disable-line import/no-extraneous-dependencies
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import SignIn from "../pages/SignIn";
import { AuthProvider } from "../providers/AuthProvider";

describe("Header", () => {
  test("スナップショット", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("サインインボタンの表示", () => {
    render(<Header />, { wrapper: BrowserRouter });
    expect(screen.getByText("サインイン")).toBeInTheDocument();
  });

  test("ログインユーザー名の表示", async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <SignIn />
        </AuthProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("メールアドレス");
    const passwordInput = screen.getByLabelText("パスワード");
    const signInButton = screen.getByTestId("sign-in-button");

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "testtest");
    userEvent.click(signInButton);

    expect(await screen.findByText("USER_1")).toBeInTheDocument();
  });
});
