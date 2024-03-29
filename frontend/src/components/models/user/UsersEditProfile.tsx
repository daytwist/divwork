import {
  ChangeEvent,
  useState,
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { PhotoCamera } from "@mui/icons-material";
import {
  Avatar,
  Button,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { User } from "../../../types/userTypes";
import { usePatchUser } from "../../../hooks/user/usePatchUser";

type Props = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

export const UsersEditProfile = (props: Props) => {
  const { user, setUser } = props;

  const [image, setImage] = useState({
    data: "",
    filename: "",
  });

  const handleUpdateUser = usePatchUser({
    name: user.name,
    email: user.email,
    avatar: image,
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    console.log(value);
  };

  const handleImageSelect = (event: FormEvent) => {
    const { files } = event.target as HTMLInputElement;
    const reader = new FileReader();

    if (files) {
      reader.onload = () => {
        setImage({
          data: reader.result as string,
          filename: files[0] ? files[0].name : "unknownFile",
        });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <Grid2 container direction="column" rowSpacing={3}>
      <Grid2 xs={12}>
        <Stack direction="column" spacing={1} alignItems="flex-start">
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Typography variant="subtitle1" component="div" sx={{ mr: 1 }}>
              アイコン画像
            </Typography>
            <Tooltip title="ファイル選択" placement="top" arrow>
              <IconButton component="label">
                <input
                  hidden
                  accept="image/png, image/jpeg"
                  type="file"
                  onChange={handleImageSelect}
                />
                <PhotoCamera />
              </IconButton>
            </Tooltip>
          </Stack>
          {user.avatar ? (
            <Avatar
              src={user.avatar}
              alt="avatar"
              sx={{
                width: 150,
                height: 150,
              }}
            />
          ) : (
            <Typography variant="body1" component="div">
              未設定
            </Typography>
          )}
          {image ? (
            <Typography variant="body1" component="div">
              {image.filename}
            </Typography>
          ) : null}
        </Stack>
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          required
          inputProps={{ maxLength: 10 }}
          label="ユーザー名"
          variant="standard"
          color="secondary"
          sx={{ width: "30ch" }}
          helperText="10文字以内"
          name="name"
          value={user?.name}
          onChange={handleInputChange}
        />
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          required
          label="メールアドレス"
          variant="standard"
          color="secondary"
          sx={{ width: "30ch" }}
          name="email"
          value={user?.email}
          onChange={handleInputChange}
        />
      </Grid2>
      <Grid2 xs={12}>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={handleUpdateUser}
        >
          更新する
        </Button>
      </Grid2>
    </Grid2>
  );
};
