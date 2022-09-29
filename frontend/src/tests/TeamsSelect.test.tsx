/* eslint-disable testing-library/no-unnecessary-act */
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import TeamsSelect from "../components/pages/TeamsSelect";
import { SnackbarProvider } from "../providers/SnackbarProvider";
import SignUp from "../components/pages/SignUp";
import { AuthProvider } from "../providers/AuthProvider";

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
    act(() => {
      userEvent.click(screen.getByLabelText("チーム *"));
    });
    expect(await screen.findByText("TEAM_1")).toBeInTheDocument();
    expect(await screen.findByText("TEAM_2")).toBeInTheDocument();
  });

  test("新規チーム作成", async () => {
    render(
      <MemoryRouter initialEntries={["/sign_up/teams/select"]}>
        <AuthProvider>
          <SnackbarProvider>
            <Routes>
              <Route path="/sign_up/teams/select" element={<TeamsSelect />} />
              <Route path="/sign_up" element={<SignUp />} />
            </Routes>
          </SnackbarProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    act(() => {
      userEvent.type(screen.getByLabelText("新規チーム名 *"), "TEAM_NEW");
      userEvent.click(screen.getByRole("button", { name: "作成" }));
    });

    jest.useFakeTimers();
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(await screen.findByText("所属チーム：TEAM_NEW")).toBeInTheDocument();
  });
});
