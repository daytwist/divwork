// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TeamsSelect from "../pages/TeamsSelect";

describe("TeamsSelect", () => {
  test("スナップショット", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <TeamsSelect />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("チーム一覧の表示", async () => {
    render(
      <BrowserRouter>
        <TeamsSelect />
      </BrowserRouter>
    );
    expect(await screen.findByText("所属チームの選択")).toBeInTheDocument();
  });
});
