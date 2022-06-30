import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer"; // eslint-disable-line import/no-extraneous-dependencies
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

describe("Home", () => {
  test("'DivWork'が表示されていること", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const textElement = screen.getByText("DivWork");
    expect(textElement).toBeInTheDocument();
  });

  test("'サインアップ'が表示されていること", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const textElement = screen.getByText("サインアップ");
    expect(textElement).toBeInTheDocument();
  });

  test("'サインイン'が表示されていること", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const textElement = screen.getByText("サインイン");
    expect(textElement).toBeInTheDocument();
  });

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
});
