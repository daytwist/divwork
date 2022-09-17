import { ChipProps } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LowPriorityIcon from "@mui/icons-material/LowPriority";

export const PriorityChipProps = (params: GridRenderCellParams): ChipProps => {
  if (params.value === "high") {
    return {
      icon: <PriorityHighIcon sx={{ width: 16, high: 16 }} />,
      label: "高",
      color: "error",
    };
  }
  if (params.value === "medium") {
    return {
      icon: <WarningAmberIcon sx={{ width: 16, high: 16 }} />,
      label: "中",
      color: "warning",
    };
  }
  return {
    icon: <LowPriorityIcon sx={{ width: 16, high: 16 }} />,
    label: "low",
    color: "success",
  };
};
