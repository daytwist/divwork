import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";

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
});
