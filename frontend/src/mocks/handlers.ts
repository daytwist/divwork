// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";
import { mockSignIn } from "./mockAuth";
import { mockTeams } from "./mockTeams";

export const handlers = [
  rest.get("/teams/select", mockTeams),
  rest.post("/sign_in", mockSignIn),
];
