import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { AuthContext } from "../providers/AuthProvider";

const Header: FC = () => {
  const { isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onClickSignOut = () => {
    const options: AxiosRequestConfig = {
      url: "/auth/sign_out",
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
          Cookies.remove("_access_token");
          Cookies.remove("_client");
          Cookies.remove("_uid");

          setIsSignedIn(false);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h5"
          component="a"
          href="/"
          sx={{
            flexGrow: 1,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          DivWork
        </Typography>
        {isSignedIn && (
          <div>
            <h4>{currentUser?.name}</h4>
            <button type="submit" onClick={onClickSignOut}>
              サインアウト
            </button>
          </div>
        )}
        {isSignedIn || (
          <div>
            <h4>サインイン</h4>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
