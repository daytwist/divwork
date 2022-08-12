// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker } from "msw";
import { handlers } from "./handlers";

export const server = setupWorker(...handlers);
