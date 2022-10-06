import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const BackIconButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Tooltip title="戻る" placement="top" arrow>
      <IconButton size="large" onClick={handleBack}>
        <ArrowBackIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
};