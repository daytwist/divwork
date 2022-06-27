import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer"; // eslint-disable-line import/no-extraneous-dependencies
import { BrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";

describe("SignIn", () => {
  it("'Sign In'が表示されていること", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const textElement = screen.getByText("Sign In");
    expect(textElement).toBeInTheDocument();
  });

  it("'サインイン'が表示されていること", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const textElement = screen.getByText("サインイン");
    expect(textElement).toBeInTheDocument();
  });

  it("スナップショット", () => {
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
