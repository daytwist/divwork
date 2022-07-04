import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer"; // eslint-disable-line import/no-extraneous-dependencies
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

  test("スナップショット", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <TasksNew />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
