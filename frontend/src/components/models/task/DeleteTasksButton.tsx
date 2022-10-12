import { IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AlertDialog } from "../../ui/AlertDialog";

type Props = {
  handleOpen: () => void;
  handleClose: () => void;
  disabled: boolean;
  open: boolean;
  onClick: () => void;
};

export const DeleteTasksButton = (props: Props) => {
  const { handleOpen, handleClose, disabled, open, onClick } = props;

  return (
    <div>
      <IconButton
        color="error"
        onClick={handleOpen}
        disabled={disabled}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <DeleteIcon />
      </IconButton>
      <Button
        color="error"
        variant="outlined"
        onClick={handleOpen}
        disabled={disabled}
        startIcon={<DeleteIcon />}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        削除する
      </Button>
      <AlertDialog
        open={open}
        handleClose={handleClose}
        objectName="タスク"
        onClick={onClick}
      />
    </div>
  );
};
