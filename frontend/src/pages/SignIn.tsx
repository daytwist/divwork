import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axios";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const navigate = useNavigate();

  const onClickSignIn = async () => {
    const options: AxiosRequestConfig = {
      url: "/auth/sign_in",
      method: "POST",
      params: { email, password },
    };

    try {
      const res: AxiosResponse = await axiosInstance(options);
      console.log(res);
      // navigate(`/teams/${user.team.id}`, { replace: true });
    } catch (err) {
      console.log(err);
    }
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
    </div>
  );
};

export default SignIn;
