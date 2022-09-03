import { FC } from "react";
import { Box } from "@mui/material";
import { RotatingTriangles } from "react-loader-spinner";

export const LoadingSpinner: FC = () => {
  return (
    <Box
      mt={10}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <RotatingTriangles
        visible
        height="80"
        width="80"
        ariaLabel="rotating-triangels-loading"
        wrapperStyle={{}}
        wrapperClass="rotating-triangels-wrapper"
      />
    </Box>
  );
};
