import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";

type Props = {
  userId: number | undefined;
  avatar: string | undefined;
};

export const TaskCardAvatar = (props: Props) => {
  const { userId, avatar } = props;

  return (
    <Avatar
      src={avatar}
      alt="avatar"
      component={Link}
      to={`/users/${userId}`}
      sx={{ width: 30, height: 30, mr: 1 }}
    />
  );
};
