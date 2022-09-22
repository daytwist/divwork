import { Link as RouterLink } from "react-router-dom";
import { Avatar, Link, Stack, Typography } from "@mui/material";
import { User } from "../../../types";

type Props = {
  user: User | undefined;
};

export const UserNameHeader = (props: Props) => {
  const { user } = props;

  return (
    <Stack direction="row" alignItems="center" mb={1}>
      {user?.avatar ? (
        <Avatar
          src={user.avatar}
          alt="avatar"
          component={RouterLink}
          to={`/users/${user.id}`}
          sx={{
            width: { sm: 60 },
            height: { sm: 60 },
            ml: 1,
            mr: 2,
          }}
        />
      ) : (
        <Avatar
          component={RouterLink}
          to={`/users/${user?.id}`}
          sx={{
            width: { sm: 60 },
            height: { sm: 60 },
            ml: 1,
            mr: 2,
          }}
        />
      )}
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
  );
};
