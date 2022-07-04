import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer"; // eslint-disable-line import/no-extraneous-dependencies
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";

describe("Header", () => {
  test("'サインイン'が表示されていること", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const textElement = screen.getByText("サインイン");
    expect(textElement).toBeInTheDocument();
  });

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
});
