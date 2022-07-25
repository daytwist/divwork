import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DivisionsNew from "../pages/DivisionsNew";

describe("DivisionsNew", () => {
  test("送信ボタンが表示されていること", () => {
    render(
      <BrowserRouter>
        <DivisionsNew />
      </BrowserRouter>
    );
    const textElement = screen.getByText("送信");
    expect(textElement).toBeInTheDocument();
  });
});
