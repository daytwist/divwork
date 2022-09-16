import { Avatar, Stack, Typography } from "@mui/material";
import { User } from "../../../types";

type Props = {
  user: User | undefined;
};

export const UserNameHeader = (props: Props) => {
  const { user } = props;

  return (
    <Stack direction="row" spacing={2} alignItems="center" mb={1}>
      {user?.avatar ? (
        <Avatar
          src={user.avatar}
          alt="avatar"
          sx={{
            width: { sm: 60 },
            height: { sm: 60 },
            ml: 1,
          }}
        />
      ) : (
        <Avatar
          sx={{
            width: { sm: 60 },
            height: { sm: 60 },
            ml: 1,
          }}
        />
      )}
      <Typography variant="h4" component="div" data-testid="users-show-h4">
        {user?.name}のタスク
      </Typography>
    </Stack>
  );
};
