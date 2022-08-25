import { rest } from "msw";
import { mockSignIn, mockAuthSessions } from "./mockAuth";
import { mockDivisionCreate, mockDivisionNew } from "./mockDivision";
import { mockTeam } from "./mockTeam";
import { mockTeams } from "./mockTeams";
import { mockUser, mockUserEdit } from "./mockUser";

export const handlers = [
  rest.get("/teams/select", mockTeams),
  rest.post("/auth/sign_in", mockSignIn),
  rest.get("/auth/sessions", mockAuthSessions),
  rest.get("/teams/:id", mockTeam),
  rest.get("/users/:id", mockUser),
  rest.patch("/auth", mockUserEdit),
  rest.get("/tasks/:id/divisions/new", mockDivisionNew),
  rest.post("/tasks/:id/divisions", mockDivisionCreate),
];
