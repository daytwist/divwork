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
  handleSetSnackbar: ({ open, type, message }: State) => void;
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

  const handleSetSnackbar = ({ open, type, message }: State) => {
    setSnackbarState({ open, type, message });
  };

  const SnackbarStateValue = useMemo(
    () => ({ snackbarState, setSnackbarState, handleSetSnackbar }),
    [snackbarState, setSnackbarState, handleSetSnackbar]
  );

  return (
    <SnackbarContext.Provider value={SnackbarStateValue}>
      {children}
    </SnackbarContext.Provider>
  );
};
