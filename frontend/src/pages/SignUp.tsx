import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import { axiosInstance } from "../utils/axios";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onClickSignUp = async () => {
    const options: AxiosRequestConfig = {
      url: "/auth",
      method: "POST",
      params: { email, password },
    };

    try {
      const res: AxiosResponse = await axiosInstance(options);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
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
