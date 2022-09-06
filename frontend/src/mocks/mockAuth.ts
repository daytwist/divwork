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

export const mockGuestSignIn: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      data: {
        is_signed_in: true,
        current_user: {
          email: "guest@example.com",
          uid: "guest@example.com",
          id: 3,
          provider: "email",
          allow_password_change: false,
          name: "ゲスト",
          nickname: null,
          image: null,
          team_id: 1,
        },
      },
    })
  );
};

export const mockAuthUpdate: ResponseResolver<
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
        avatar: "",
        admin: false,
      },
    })
  );
};

export const mockAuthDelete: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: "success",
      message: "'test@example.com'のアカウントは削除されました",
    })
  );
};

export const mockAuthPasswordsUpdate: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      success: true,
      data: {
        id: 1,
        provider: "email",
        uid: "update@example.com",
        allow_password_change: false,
        name: "USER_1",
        nickname: null,
        image: null,
        email: "test@example.com",
        team_id: 1,
        created_at: "2022-06-05T10:16:09.882+09:00",
        updated_at: "2022-06-05T10:16:09.882+09:00",
        unfinished_tasks_count: [1, 2, 3],
        avatar: "",
        admin: false,
      },
      message: "パスワードの更新に成功しました。",
    })
  );
};
