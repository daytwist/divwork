import { MockedRequest, ResponseResolver, restContext } from "msw";

export const mockSignIn: ResponseResolver<MockedRequest, typeof restContext> = (
  req,
  res,
  ctx
) => {
  const email = req.url.searchParams.get("email");
  const password = req.url.searchParams.get("password");

  if (email === "test@example.com" && password === "testtest") {
    return res(
      ctx.status(200),
      ctx.set("access-token", "abc"),
      ctx.set("client", "def"),
      ctx.set("uid", "test@example.com"),
      ctx.json({
        data: {
          email: "test@example.com",
          uid: "test@example.com",
          id: 1,
          provider: "email",
          allow_password_change: false,
          name: "USER_1",
          nickname: null,
          image: null,
          team_id: 1,
        },
      })
    );
  }
  return res(
    ctx.status(401),
    ctx.json({
      success: false,
      errors: ["ログイン用の認証情報が正しくありません。再度お試しください。"],
    })
  );
};

export const mockAuthSessions: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  if (req.headers.get("uid") === "test@example.com") {
    return res(
      ctx.status(200),
      ctx.json({
        is_signed_in: true,
        current_user: {
          email: "test@example.com",
          uid: "test@example.com",
          id: 1,
          provider: "email",
          allow_password_change: false,
          name: "USER_1",
          nickname: null,
          image: null,
          team_id: 1,
        },
      })
    );
  }
  return res(
    ctx.status(200),
    ctx.json({
      is_signed_in: false,
      current_user: "",
    })
  );
};
