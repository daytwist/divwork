import { rest } from "msw";
import {
  mockSignIn,
  mockAuthSessions,
  mockGuestSignIn,
  mockAuthDelete,
  mockAuthUpdate,
  mockAuthPasswordsUpdate,
} from "./mockAuth";
import { mockDivisionsCreate, mockDivisionsNew } from "./mockDivisions";
import { mockTasksShow } from "./mockTasks";
import {
  mockTeamsCreate,
  mockTeamsSelect,
  mockTeamsShow,
  mockTeamsUpdate,
} from "./mockTeams";
import { mockUsersEdit, mockUsersShow } from "./mockUsers";

export const handlers = [
  rest.get("/auth/sessions", mockAuthSessions),
  rest.post("/auth/sign_in", mockSignIn),
  rest.post("/auth/guest_sign_in", mockGuestSignIn),
  rest.patch("/auth/password", mockAuthPasswordsUpdate),
  rest.patch("/auth", mockAuthUpdate),
  rest.delete("/auth", mockAuthDelete),
  rest.get("/teams/select", mockTeamsSelect),
  rest.get("/teams/:id", mockTeamsShow),
  rest.patch("/teams/:id", mockTeamsUpdate),
  rest.post("/teams", mockTeamsCreate),
  rest.get("/users/:id/edit", mockUsersEdit),
  rest.get("/users/:id", mockUsersShow),
  rest.get("/tasks/:id/divisions/new", mockDivisionsNew),
  rest.post("/tasks/:id/divisions", mockDivisionsCreate),
  rest.get("/tasks/:id", mockTasksShow),
  rest.delete("/tasks/:id", mockTasksShow),
];
