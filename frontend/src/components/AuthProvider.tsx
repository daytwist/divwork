import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
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
