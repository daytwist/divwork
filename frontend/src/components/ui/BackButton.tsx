import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Tooltip title="戻る" placement="top" arrow>
      <IconButton onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  );
};
