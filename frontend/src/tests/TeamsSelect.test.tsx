// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
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
    render(<TeamsSelect />, { wrapper: BrowserRouter });
    const teamInput = screen.getByLabelText("チーム");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(teamInput);
    });

    expect(await screen.findByText("TEAM_1")).toBeInTheDocument();
    expect(await screen.findByText("TEAM_2")).toBeInTheDocument();
  });
});
