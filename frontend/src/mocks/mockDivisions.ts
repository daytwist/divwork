import { MockedRequest, ResponseResolver, restContext } from "msw";

export const mockDivisionsNew: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      task: {
        id: null,
        title: "TASK_3",
        description: "DIVISION",
        deadline: "2022-06-12T13:16:00.000+09:00",
        priority: "medium",
        is_done: false,
        user_id: 1,
        created_at: "2022-06-09T21:26:46.537+09:00",
        updated_at: "2022-06-09T21:26:46.537+09:00",
        parent_id: 1,
      },
      team_members: [
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
        },
      ],
    })
  );
};

export const mockDivisionsCreate: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      task: {
        id: 3,
        title: "TASK_3",
        description: "DIVISION",
        deadline: "2022-06-12T13:16:00.000+09:00",
        priority: "medium",
        is_done: false,
        user_id: 2,
        created_at: "2022-06-09T21:26:46.537+09:00",
        updated_at: "2022-06-09T21:26:46.537+09:00",
        parent_id: 1,
      },
      division: {
        id: 1,
        user_id: 1,
        task_id: 3,
        created_at: "2022-07-03T12:00:17.069+09:00",
        updated_at: "2022-07-03T12:00:17.069+09:00",
        comment: "Thank you",
      },
    })
  );
};
