import { rest } from "msw";

export const handlers = [
  rest.get("/", (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ message: "hello, world!" }))
  ),
];
