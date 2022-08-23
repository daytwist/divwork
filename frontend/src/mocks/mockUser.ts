// eslint-disable-next-line import/no-extraneous-dependencies
import { MockedRequest, ResponseResolver, restContext } from "msw";

export const mockUser: ResponseResolver<MockedRequest, typeof restContext> = (
  req,
  res,
  ctx
) => {
  return res(
    ctx.status(200),
    ctx.json({
      user: {
        id: 1,
        provider: "email",
        uid: "test@example.com",
        allow_password_change: false,
        name: "USER_1",
        nickname: null,
        image: null,
        email: "test@example.com",
        team_id: 1,
        created_at: "2022-06-05T10:16:09.882+09:00",
        updated_at: "2022-06-05T10:16:09.882+09:00",
        tasks_count: [1, 2, 3],
      },
    })
  );
};

export const mockUserEdit: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: "success",
      data: {
        id: 1,
        provider: "email",
        uid: "update@example.com",
        allow_password_change: false,
        name: "USER_UPDATE",
        nickname: null,
        image: null,
        email: "test@example.com",
        team_id: 1,
        created_at: "2022-06-05T10:16:09.882+09:00",
        updated_at: "2022-06-05T10:16:09.882+09:00",
        tasks_count: [1, 2, 3],
      },
    })
  );
};
