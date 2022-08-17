import { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthSessionsResponse, User } from "../types";
import { axiosInstance } from "../utils/axios";

type Props = {
  children: ReactNode;
};

type AuthContextValue = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
  currentUser: User | undefined;
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
};

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

export const AuthProvider: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  const AuthProviderValue = useMemo(
    () => ({
      loading,
      setLoading,
      isSignedIn,
      setIsSignedIn,
      currentUser,
      setCurrentUser,
    }),
    [
      loading,
      setLoading,
      isSignedIn,
      setIsSignedIn,
      currentUser,
      setCurrentUser,
    ]
  );

  const options: AxiosRequestConfig = {
    url: "/auth/sessions",
    method: "GET",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
  };

  useEffect(() => {
    axiosInstance(options)
      .then((res: AxiosResponse<AuthSessionsResponse>) => {
        console.log(res);

        if (res.data.is_signed_in === true) {
          setIsSignedIn(true);
          setCurrentUser(res.data.current_user);
          setLoading(false);
        } else if (res.data.is_signed_in === false) {
          setIsSignedIn(false);
          setLoading(false);
        } else {
          setLoading(true);
        }
      })
      .catch((err) => console.log(err));
  }, [isSignedIn]);

  return (
    <AuthContext.Provider value={AuthProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};
