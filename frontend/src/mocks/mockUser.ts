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
        unfinished_tasks_count: [1, 2, 3],
      },
      unfinished_tasks: [
        {
          id: 1,
          title: "UNFINISHED_TASK_1",
          description: "UNFINISHED",
          deadline: "2022-06-12T13:16:00.000+09:00",
          priority: "low",
          is_done: false,
          user_id: 1,
          created_at: "2022-06-09T21:26:46.537+09:00",
          updated_at: "2022-06-09T21:26:46.537+09:00",
          parent_id: null,
        },
      ],
      finished_tasks: [
        {
          id: 2,
          title: "FINISHED_TASK_2",
          description: "FINISHED",
          deadline: "2022-06-12T13:16:00.000+09:00",
          priority: "high",
          is_done: true,
          user_id: 1,
          created_at: "2022-06-09T21:26:46.537+09:00",
          updated_at: "2022-06-09T21:26:46.537+09:00",
          parent_id: null,
        },
      ],
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
        unfinished_tasks_count: [1, 2, 3],
      },
    })
  );
};
