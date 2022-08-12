import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TeamsSelect from "../pages/TeamsSelect";

describe("TeamsSelect", () => {
  test("チーム一覧の表示", async () => {
    render(
      <BrowserRouter>
        <TeamsSelect />
      </BrowserRouter>
    );
    const team = await screen.findByText(/所属チームの選択/);
    expect(team).toBeInTheDocument();
  });
});
