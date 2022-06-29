import Cookies from "js-cookie";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

type AuthContextValue = {
  isSignedIn: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

export const AuthProvider: FC<Props> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const AuthProviderValue = useMemo(
    () => ({ isSignedIn, setIsSignedIn }),
    [isSignedIn, setIsSignedIn]
  );

  return (
    <AuthContext.Provider value={AuthProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const GetIsSignedIn = () => {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);

  if (
    Cookies.get("_access_token") &&
    Cookies.get("_client") &&
    Cookies.get("_uid")
  ) {
    setIsSignedIn(true);
    console.log(isSignedIn);
  } else {
    setIsSignedIn(false);
    console.log(isSignedIn);
  }
};
