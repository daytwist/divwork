// eslint-disable-next-line import/no-extraneous-dependencies
import { MockedRequest, ResponseResolver, restContext } from "msw";

export const mockSignIn: ResponseResolver<MockedRequest, typeof restContext> = (
  req,
  res,
  ctx
) => {
  return res(
    ctx.status(200),
    ctx.json({
      data: {
        email: "long.considine@sipes.biz",
        uid: "long.considine@sipes.biz",
        id: 1,
        provider: "email",
        allow_password_change: false,
        name: "吉田 空",
        nickname: null,
        image: null,
        team_id: 1,
      },
    })
  );
};
