import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
};

export const AlertDialog = (props: Props) => {
  const { open, handleClose } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">タスクを削除しますか？</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          削除したタスクは元に戻せません。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          削除する
        </Button>
        <Button color="secondary" onClick={handleClose} autoFocus>
          戻る
        </Button>
      </DialogActions>
    </Dialog>
  );
};
