import { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInResponse, User } from "../types";
import { axiosInstance } from "../utils/axios";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User>();

  const navigate = useNavigate();

  const onClickSignIn = async () => {
    const options: AxiosRequestConfig = {
      url: "/auth/sign_in",
      method: "POST",
      params: { email, password },
    };

    await axiosInstance(options)
      .then((res: AxiosResponse<SignInResponse>) => {
        console.log(res);

        if (res.status === 200) {
          Cookies.set("access-token", res.headers["access-token"]);
          Cookies.set("client", res.headers.client);
          Cookies.set("uid", res.headers.uid);

          setCurrentUser(res.data.data);
          navigate(`/teams/${res.data.data.team_id}`, { replace: false });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Sign In</h1>
      <div>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button type="submit" onClick={onClickSignIn}>
          サインイン
        </button>
      </div>
      <h3>{currentUser?.name}</h3>
    </div>
  );
};

export default SignIn;
