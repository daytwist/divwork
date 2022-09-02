import { MockedRequest, ResponseResolver, restContext } from "msw";

export const mockTeam: ResponseResolver<MockedRequest, typeof restContext> = (
  req,
  res,
  ctx
) => {
  return res(
    ctx.status(200),
    ctx.json({
      team: {
        id: 1,
        name: "TEAM_1",
        created_at: "2022-06-05T10:16:09.882+09:00",
        updated_at: "2022-06-05T10:16:09.882+09:00",
        max_num_of_users: 10,
      },
      users: [
        {
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
          unfinished_tasks_count: [1, 2, 3],
        },
        {
          id: 2,
          provider: "email",
          uid: "test2@example.com",
          allow_password_change: false,
          name: "USER_2",
          nickname: null,
          image: null,
          email: "test2@example.com",
          team_id: 1,
          created_at: "2022-06-05T10:16:09.882+09:00",
          updated_at: "2022-06-05T10:16:09.882+09:00",
          unfinished_tasks_count: [2, 3, 1],
        },
      ],
    })
  );
};

export const mockTeamCreate: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(
    ctx.status(201),
    ctx.json({
      team: {
        id: 3,
        name: "TEAM_NEW",
        created_at: "2022-06-05T10:16:09.882+09:00",
        updated_at: "2022-06-05T10:16:09.882+09:00",
        max_num_of_users: 10,
      },
    })
  );
};
