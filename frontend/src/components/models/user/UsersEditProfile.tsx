import {
  ChangeEvent,
  useContext,
  useState,
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
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
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../../utils/axios";
import { User, UsersUpdateResponse } from "../../../types";
import { AuthContext } from "../../../providers/AuthProvider";
import { SnackbarContext } from "../../../providers/SnackbarProvider";

type Props = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

export const UsersEditProfile = (props: Props) => {
  const { user, setUser } = props;
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const [image, setImage] = useState({
    data: "",
    filename: "",
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageSelect = (event: FormEvent) => {
    const reader = new FileReader();
    const { files } = event.target as HTMLInputElement;
    if (files) {
      reader.onload = () => {
        setImage({
          data: reader.result as string,
          filename: files[0] ? files[0].name : "unknownfile",
        });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleUsersUpdate = () => {
    const updateOptions: AxiosRequestConfig = {
      url: "/auth",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
      data: {
        name: user.name,
        email: user.email,
        avatar: image,
      },
    };

    axiosInstance(updateOptions)
      .then((res: AxiosResponse<UsersUpdateResponse>) => {
        console.log(res);

        if (res.status === 200) {
          setCurrentUser(res.data.data);
          handleSetSnackbar({
            open: true,
            type: "success",
            message: "ユーザー情報を更新しました",
          });
          navigate(`/users/${currentUser?.id}`, { replace: false });
        }
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
          message: err.response.data.errors.full_messages.join("。"),
        });
      });
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
                  accept="image/*"
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
                width: { sm: 120 },
                height: { sm: 120 },
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
          onClick={handleUsersUpdate}
        >
          更新する
        </Button>
      </Grid2>
    </Grid2>
  );
};
