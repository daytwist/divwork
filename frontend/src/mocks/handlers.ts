// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";

export const handlers = [
  rest.get("/teams/select", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        teams: {
          id: 1,
          name: "愛媛県 ants",
          created_at: "2022-06-05T10:16:09.882+09:00",
          updated_at: "2022-06-05T10:16:09.882+09:00",
        },
      })
    );
  }),
];
