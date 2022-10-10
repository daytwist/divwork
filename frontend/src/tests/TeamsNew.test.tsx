/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "../providers/SnackbarProvider";
import { SignUp } from "../components/pages/SignUp";
import { AuthProvider } from "../providers/AuthProvider";
import { TeamsNew } from "../components/pages/TeamsNew";

describe("TeamsNew", () => {
  test("新規チーム作成", async () => {
    render(
      <MemoryRouter initialEntries={["/sign_up/teams/new"]}>
        <AuthProvider>
          <SnackbarProvider>
            <Routes>
              <Route path="/sign_up/teams/new" element={<TeamsNew />} />
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
