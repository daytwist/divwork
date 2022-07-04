import { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthResponse, Team } from "../types/index";
import { axiosInstance } from "../utils/axios";

type State = {
  selectTeam: Team;
};

const SignUp: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const location = useLocation();
  const { selectTeam } = location.state as State;

  const onClickSignUp = () => {
    const options: AxiosRequestConfig = {
      url: "/auth",
      method: "POST",
      params: {
        name,
        email,
        password,
        team_id: selectTeam.id,
      },
    };

    axiosInstance(options)
      .then((res: AxiosResponse<AuthResponse>) => {
        console.log(res);

        if (res.status === 200) {
          Cookies.set("_access_token", res.headers["access-token"]);
          Cookies.set("_client", res.headers.client);
          Cookies.set("_uid", res.headers.uid);

          navigate(`/teams/${res.data.data.team_id}`, { replace: false });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <div>{selectTeam.name}</div>
      <div>
        <input value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button type="submit" onClick={onClickSignUp}>
          サインアップ
        </button>
      </div>
    </div>
  );
};

export default SignUp;
