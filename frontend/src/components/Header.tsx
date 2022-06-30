import { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axios";
import { AuthContext } from "./AuthProvider";

const Header: React.FC = () => {
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

  if (isSignedIn === true) {
    return (
      <div>
        <h4>{currentUser?.name}</h4>
        <button type="submit" onClick={onClickSignOut}>
          サインアウト
        </button>
      </div>
    );
  }

  return (
    <div>
      <h4>サインイン</h4>
    </div>
  );
};

export default Header;
