// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";
import { mockTeams } from "./mockTeams";

export const handlers = [rest.get("/teams/select", mockTeams)];
