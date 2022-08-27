import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

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

  test("'DivWork'が表示されていること", () => {
    render(<Home />, { wrapper: BrowserRouter });
    const textElement = screen.getByText("DivWork");
    expect(textElement).toBeInTheDocument();
  });

  test("'ユーザー登録'が表示されていること", () => {
    render(<Home />, { wrapper: BrowserRouter });
    const textElement = screen.getByText("ユーザー登録");
    expect(textElement).toBeInTheDocument();
  });

  test("'ログイン'が表示されていること", () => {
    render(<Home />, { wrapper: BrowserRouter });
    const textElement = screen.getByText("ログイン");
    expect(textElement).toBeInTheDocument();
  });
});
