import {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { useFetchUser } from "../hooks/useFetchUser";
import { AuthContext } from "../providers/AuthProvider";
import { User, UsersEditResponse } from "../types";
import { SnackbarContext } from "../providers/SnackbarProvider";
import { AlertDialog } from "../components/AlertDialog";

const UsersEdit: FC = () => {
  const { setIsSignedIn, currentUser, setCurrentUser } =
    useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const { user: userData } = useFetchUser();

  const [user, setUser] = useState<User>({
    team_id: 0,
    name: "",
    email: "",
    id: 0,
    provider: "",
    uid: "",
    allow_password_change: false,
    nickname: "",
    image: "",
    created_at: new Date(),
    updated_at: new Date(),
    unfinished_tasks_count: [0],
    avatar: "",
    admin: false,
  });

  const [image, setImage] = useState({
    data: "",
    filename: "",
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      .then((res: AxiosResponse<UsersEditResponse>) => {
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

  const handleUsersDelete = () => {
    const options: AxiosRequestConfig = {
      url: "/auth",
      method: "DELETE",
      headers: {
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
    };

    axiosInstance(options)
      .then((res: AxiosResponse) => {
        console.log(res);

        if (res.status === 200) {
          setIsSignedIn(false);
          handleSetSnackbar({
            open: true,
            type: "success",
            message:
              "アカウントを削除しました。またのご利用をお待ちしております。",
          });
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
          message: err.response.data.error,
        });
      });
  };

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  return (
    <div>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div">
            アカウント設定
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="subtitle1" component="div">
                    アイコン画像
                  </Typography>
                </Grid>
                <Grid item>
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
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              {user.avatar ? (
                <img src={user.avatar} alt="avatar" width={300} height="auto" />
              ) : (
                <Typography variant="body1" component="div">
                  未設定
                </Typography>
              )}
            </Grid>
            <Grid item>
              {image ? (
                <Typography variant="body1" component="div">
                  選択中のファイル：{image.filename}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            label="ユーザー名"
            variant="standard"
            sx={{ width: "30ch" }}
            name="name"
            value={user?.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            label="メールアドレス"
            variant="standard"
            sx={{ width: "30ch" }}
            name="email"
            value={user?.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit" onClick={handleUsersUpdate}>
            更新する
          </Button>
        </Grid>
        <Grid item>
          <Button color="secondary" variant="contained">
            パスワード変更
          </Button>
        </Grid>
        <Grid item>
          <Button color="error" variant="outlined" onClick={handleClickOpen}>
            アカウント削除
          </Button>
          <AlertDialog
            open={open}
            handleClose={handleClose}
            objectName="アカウント"
            onClick={handleUsersDelete}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersEdit;
