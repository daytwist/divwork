import { useState } from "react";
import { Button } from "@mui/material";
import { AlertDialog } from "../../ui/AlertDialog";
import { useDeleteUser } from "../../../hooks/user/useDeleteUser";

export const DeleteAccountButton = () => {
  const handleDeleteUser = useDeleteUser();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="error" variant="outlined" onClick={handleClickOpen}>
        アカウント削除
      </Button>
      <AlertDialog
        open={open}
        handleClose={handleClose}
        objectName="アカウント"
        onClick={handleDeleteUser}
      />
    </div>
  );
};
