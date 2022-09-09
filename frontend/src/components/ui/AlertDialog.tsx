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
  objectName: string;
  onClick: () => void;
};

export const AlertDialog = (props: Props) => {
  const { open, handleClose, objectName, onClick } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {objectName}を削除しますか？
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          削除した{objectName}は元に戻せません。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClick}>
          削除する
        </Button>
        <Button color="secondary" onClick={handleClose} autoFocus>
          戻る
        </Button>
      </DialogActions>
    </Dialog>
  );
};
