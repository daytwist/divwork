import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer"; // eslint-disable-line import/no-extraneous-dependencies
import { BrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";

describe("SignIn", () => {
  test("'Sign In'が表示されていること", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const textElement = screen.getByText("Sign In");
    expect(textElement).toBeInTheDocument();
  });

  test("'サインイン'が表示されていること", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const textElement = screen.getByText("サインイン");
    expect(textElement).toBeInTheDocument();
  });

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
});
