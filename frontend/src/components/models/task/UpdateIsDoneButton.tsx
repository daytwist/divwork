import { Button, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

type Props = {
  onClick: () => void;
  disabled: boolean;
  isFinished: boolean | undefined;
};

export const UpdateIsDoneButton = (props: Props) => {
  const { onClick, disabled, isFinished } = props;

  return (
    <div>
      <IconButton
        color="secondary"
        onClick={onClick}
        disabled={disabled}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        {isFinished ? <KeyboardReturnIcon /> : <CheckIcon />}
      </IconButton>
      <Button
        color="secondary"
        variant="contained"
        onClick={onClick}
        disabled={disabled}
        startIcon={<CheckIcon />}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        {isFinished ? "未了" : "完了済み"}にする
      </Button>
    </div>
  );
};
