import { Avatar } from "@mui/material";

type Props = {
  avatar: string | undefined;
};

export const TaskCardAvatar = (props: Props) => {
  const { avatar } = props;

  return (
    <div>
      {avatar ? (
        <Avatar
          src={avatar}
          alt="avatar"
          sx={{
            width: { sm: 30 },
            height: { sm: 30 },
          }}
        />
      ) : (
        <Avatar
          sx={{
            width: { sm: 30 },
            height: { sm: 30 },
          }}
        />
      )}
    </div>
  );
};
