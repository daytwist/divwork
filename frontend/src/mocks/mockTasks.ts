import { MockedRequest, ResponseResolver, restContext } from "msw";

export const mockTasksShow: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      task: {
        id: 2,
        title: "TASK_2",
        description: "TASKTASK",
        deadline: "2022-08-31T12:00:20.000+09:00",
        priority: "medium",
        is_done: false,
        user_id: 1,
        created_at: "2022-08-26T17:02:20.690+09:00",
        updated_at: "2022-08-26T22:20:34.948+09:00",
        parent_id: 1,
      },
      children_tasks: [
        {
          id: 3,
          title: "TASK_3",
          description: "TASKTASK",
          deadline: "2022-08-31T12:00:20.000+09:00",
          priority: "medium",
          is_done: false,
          user_id: 3,
          created_at: "2022-08-26T17:02:20.690+09:00",
          updated_at: "2022-08-26T22:20:34.948+09:00",
          parent_id: 2,
          user: { name: "USER_3" },
          division: {
            id: 2,
            user_id: 4,
            task_id: 3,
            created_at: "2022-07-03T12:00:17.069+09:00",
            updated_at: "2022-07-03T12:00:17.069+09:00",
            comment: "Thank you",
            user: { name: "USER_4" },
          },
        },
      ],
      division: {
        id: 1,
        user_id: 2,
        task_id: 1,
        created_at: "2022-07-03T12:00:17.069+09:00",
        updated_at: "2022-07-03T12:00:17.069+09:00",
        comment: "Thank you",
        user: { name: "USER_2" },
      },
    })
  );
};
