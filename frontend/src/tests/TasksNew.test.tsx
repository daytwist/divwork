import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TasksNew from "../pages/TasksNew";

describe("TasksNew", () => {
  test("'タイトル'ラベルが表示されていること", () => {
    render(
      <BrowserRouter>
        <TasksNew />
      </BrowserRouter>
    );
    const labelElement = screen.getByLabelText("タイトル");
    expect(labelElement).toBeInTheDocument();
  });
});
