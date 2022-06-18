import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axios";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const onClick = async () => {
    await axiosInstance.post("/auth/sign_in", { email, password });
    navigate("/teams/:id", { replace: true });
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
