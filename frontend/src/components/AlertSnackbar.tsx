import { SyntheticEvent, useContext } from "react";
import { Alert, Snackbar, Stack } from "@mui/material";
import { SnackbarContext } from "../providers/SnackbarProvider";

export const AlertSnackbar = () => {
  const { snackbarState, setSnackbarState } = useContext(SnackbarContext);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarState({ ...snackbarState, open: false });
  };

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarState.type}
          sx={{ width: "100%" }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
