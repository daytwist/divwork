import { MockedRequest, ResponseResolver, restContext } from "msw";

export const mockTask: ResponseResolver<MockedRequest, typeof restContext> = (
  req,
  res,
  ctx
) => {
  return res(
    ctx.status(200),
    ctx.json({
      task: {
        id: 1,
        title: "TASK_1",
        description: "TASKTASK",
        deadline: "2022-08-31T12:00:20.000+09:00",
        priority: "medium",
        is_done: false,
        user_id: 1,
        created_at: "2022-08-26T17:02:20.690+09:00",
        updated_at: "2022-08-26T22:20:34.948+09:00",
        parent_id: null,
      },
    })
  );
};
