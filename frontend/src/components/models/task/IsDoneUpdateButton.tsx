import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
  onClick: () => void;
  disabled: boolean;
  isFinished: boolean | undefined;
};

export const IsDoneUpdateButton = (props: Props) => {
  const { onClick, disabled, isFinished } = props;

  return (
    <Button
      color="secondary"
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      startIcon={<CheckIcon />}
    >
      {isFinished ? "未了" : "完了済み"}にする
    </Button>
  );
};
