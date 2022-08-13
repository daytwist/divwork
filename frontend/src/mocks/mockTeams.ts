// eslint-disable-next-line import/no-extraneous-dependencies
import { MockedRequest, ResponseResolver, restContext } from "msw";

export const mockTeams: ResponseResolver<MockedRequest, typeof restContext> = (
  req,
  res,
  ctx
) => {
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
};
