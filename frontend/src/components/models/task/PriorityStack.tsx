import { Stack, Typography } from "@mui/material";
import { PriorityChip } from "./PriorityChip";

type Props = {
  value: string | undefined;
};

export const PriorityStack = (props: Props) => {
  const { value } = props;

  return (
    <Stack direction="column" alignItems="flex-start" mb={2}>
      <Typography variant="subtitle1" component="div" color="text.secondary">
        優先度
      </Typography>
      <PriorityChip value={value} />
    </Stack>
  );
};
