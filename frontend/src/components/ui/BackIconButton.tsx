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
      <div>
        <IconButton
          size="medium"
          onClick={handleBack}
          sx={{ display: { xs: "flex", sm: "none" } }}
        >
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={handleBack}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
      </div>
    </Tooltip>
  );
};
