import { Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

type Props = {
  isDone: boolean;
};

export const IsDoneTypography = (props: Props) => {
  const { isDone } = props;

  return (
    <div>
      <Typography variant="subtitle1" component="div" color="text.secondary">
        ステータス
      </Typography>
      {isDone ? (
        <Stack direction="row" spacing={0.5}>
          <CheckCircleOutlineIcon color="success" />
          <Typography variant="body1" component="div">
            完了済み
          </Typography>
        </Stack>
      ) : (
        <Stack direction="row" spacing={0.5}>
          <AssignmentLateIcon color="warning" />
          <Typography variant="body1" component="div">
            未了
          </Typography>
        </Stack>
      )}
    </div>
  );
};
