import { Dispatch, SetStateAction, useState } from "react";
import { IconButton, Button } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { AlertDialog } from "../../ui/AlertDialog";
import { useDeleteTasks } from "../../../hooks/useDeleteTasks";

type Props = {
  selectionModel: GridRowId[];
  isFinished: boolean;
  flag: boolean;
  setFlag: Dispatch<SetStateAction<boolean>>;
};

export const DeleteTasksButton = (props: Props) => {
  const { selectionModel, isFinished, flag, setFlag } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteTasks = useDeleteTasks({
    selectionModel,
    isFinished,
    flag,
    setFlag,
    handleClose,
  });

  return (
    <div>
      <IconButton
        color="error"
        onClick={handleOpen}
        disabled={selectionModel?.length === 0}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <DeleteIcon />
      </IconButton>
      <Button
        color="error"
        variant="outlined"
        onClick={handleOpen}
        disabled={selectionModel?.length === 0}
        startIcon={<DeleteIcon />}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        削除する
      </Button>
      <AlertDialog
        open={open}
        handleClose={handleClose}
        objectName="タスク"
        onClick={handleDeleteTasks}
      />
    </div>
  );
};
