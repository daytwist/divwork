import { Chip } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LowPriorityIcon from "@mui/icons-material/LowPriority";

type Props = {
  value: string | undefined;
};

export const PriorityChip = (props: Props) => {
  const { value } = props;

  if (value === "high") {
    return (
      <Chip
        variant="outlined"
        sx={{ height: 28 }}
        icon={<PriorityHighIcon sx={{ width: 16, high: 16 }} />}
        label="高"
        color="error"
      />
    );
  }
  if (value === "medium") {
    return (
      <Chip
        variant="outlined"
        sx={{ height: 28 }}
        icon={<WarningAmberIcon sx={{ width: 16, high: 16 }} />}
        label="中"
        color="warning"
      />
    );
  }
  return (
    <Chip
      variant="outlined"
      sx={{ height: 28 }}
      icon={<LowPriorityIcon sx={{ width: 16, high: 16 }} />}
      label="低"
      color="success"
    />
  );
};
