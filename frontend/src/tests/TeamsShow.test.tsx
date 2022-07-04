import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer"; // eslint-disable-line import/no-extraneous-dependencies
import { BrowserRouter } from "react-router-dom";
import TeamsShow from "../pages/TeamsShow";

describe("TeamsShow", () => {
  it("'Teams#Show'が表示されていること", () => {
    render(
      <BrowserRouter>
        <TeamsShow />
      </BrowserRouter>
    );
    const textElement = screen.getByText("Teams#Show");
    expect(textElement).toBeInTheDocument();
  });

  it("スナップショット", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <TeamsShow />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
