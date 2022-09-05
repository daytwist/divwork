import { rest } from "msw";
import { mockSignIn, mockAuthSessions, mockGuestSignIn } from "./mockAuth";
import { mockDivisionCreate, mockDivisionNew } from "./mockDivision";
import { mockTask } from "./mockTask";
import { mockTeam, mockTeamCreate } from "./mockTeam";
import { mockTeams } from "./mockTeams";
import { mockUser, mockUserEdit } from "./mockUser";

export const handlers = [
  rest.get("/teams/select", mockTeams),
  rest.post("/teams", mockTeamCreate),
  rest.post("/auth/sign_in", mockSignIn),
  rest.get("/auth/sessions", mockAuthSessions),
  rest.post("/auth/guest_sign_in", mockGuestSignIn),
  rest.get("/teams/:id", mockTeam),
  rest.get("/users/:id", mockUser),
  rest.patch("/auth", mockUserEdit),
  rest.get("/tasks/:id/divisions/new", mockDivisionNew),
  rest.post("/tasks/:id/divisions", mockDivisionCreate),
  rest.get("/tasks/:id", mockTask),
  rest.delete("/tasks/:id", mockTask),
];
