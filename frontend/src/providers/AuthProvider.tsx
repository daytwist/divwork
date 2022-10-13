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
import { AuthSessionsResponse, User } from "../types/userTypes";
import { baseAxios } from "../apis/axios";

type Props = {
  children: ReactNode;
};

type AuthContextValue = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
  currentUser: User | undefined;
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
  reloadTeamFlag: boolean;
  setReloadTeamFlag: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

export const AuthProvider: FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [reloadTeamFlag, setReloadTeamFlag] = useState(false);

  const AuthProviderValue = useMemo(
    () => ({
      isLoading,
      setIsLoading,
      isSignedIn,
      setIsSignedIn,
      currentUser,
      setCurrentUser,
      reloadTeamFlag,
      setReloadTeamFlag,
    }),
    [
      isLoading,
      setIsLoading,
      isSignedIn,
      setIsSignedIn,
      currentUser,
      setCurrentUser,
      reloadTeamFlag,
      setReloadTeamFlag,
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
    baseAxios(options)
      .then((res: AxiosResponse<AuthSessionsResponse>) => {
        console.log(res);

        if (res.data.is_signed_in === true) {
          setIsSignedIn(true);
          setCurrentUser(res.data.current_user);
          setIsLoading(false);
        } else if (res.data.is_signed_in === false) {
          setIsSignedIn(false);
          setCurrentUser(undefined);
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      })
      .catch((err) => console.log(err));
  }, [isSignedIn, setCurrentUser]);

  return (
    <AuthContext.Provider value={AuthProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};
