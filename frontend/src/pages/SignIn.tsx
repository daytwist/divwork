import { AxiosRequestConfig } from "axios";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axios";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const navigate = useNavigate();

  const options: AxiosRequestConfig = {
    url: "/auth/sign_in",
    method: "POST",
    params: { email, password },
  };

  const onClick = async () => {
    await axiosInstance(options);
    // navigate(`/teams/${user.team.id}`, { replace: true });
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
        <button type="submit" onClick={onClick}>
          サインイン
        </button>
      </div>
    </div>
  );
};

export default SignIn;
