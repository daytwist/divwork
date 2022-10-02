import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button color="secondary" onClick={handleBack}>
      戻る
    </Button>
  );
};
