import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Avatar, Link, Stack, Typography } from "@mui/material";
import { User } from "../../../types/userTypes";

type Props = {
  user: User | undefined;
};

export const UserNameHeader = (props: Props) => {
  const { user } = props;

  const userNameHeader = useMemo(
    () => (
      <Stack direction="row" alignItems="center">
        <Avatar
          src={user?.avatar}
          alt="avatar"
          component={RouterLink}
          to={`/users/${user?.id}`}
          sx={{
            width: { sm: 60 },
            height: { sm: 60 },
            ml: { xs: 0, sm: 1 },
            mr: { xs: 1.5, sm: 2 },
          }}
        />
        <Link
          variant="h4"
          color="inherit"
          underline="hover"
          component={RouterLink}
          to={`/users/${user?.id}`}
        >
          {user?.name}
        </Link>
        <Typography variant="h4" component="div" data-testid="users-show-h4">
          のタスク
        </Typography>
      </Stack>
    ),
    [user]
  );

  return <div>{userNameHeader}</div>;
};
