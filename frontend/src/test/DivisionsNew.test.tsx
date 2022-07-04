import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer"; // eslint-disable-line import/no-extraneous-dependencies
import { BrowserRouter } from "react-router-dom";
import DivisionsNew from "../pages/DivisionsNew";

describe("DivisionsNew", () => {
  test("ボタンが表示されていること", () => {
    render(
      <BrowserRouter>
        <DivisionsNew />
      </BrowserRouter>
    );
    const roleElement = screen.getByRole("button");
    expect(roleElement).toBeInTheDocument();
  });

  test("スナップショット", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <DivisionsNew />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
