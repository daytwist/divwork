import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { AlertColor } from "@mui/material";

type Props = {
  children: ReactNode;
};

type State = {
  open: boolean;
  type: AlertColor | undefined;
  message: string;
};

type SnackbarState = {
  snackbarState: State;
  setSnackbarState: Dispatch<SetStateAction<State>>;
};

export const SnackbarContext = createContext<SnackbarState>(
  {} as SnackbarState
);

export const SnackbarProvider: FC<Props> = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState<State>({
    open: false,
    type: "success",
    message: "",
  });

  const SnackbarStateValue = useMemo(
    () => ({ snackbarState, setSnackbarState }),
    [snackbarState, setSnackbarState]
  );

  return (
    <SnackbarContext.Provider value={SnackbarStateValue}>
      {children}
    </SnackbarContext.Provider>
  );
};
