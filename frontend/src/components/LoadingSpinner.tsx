import { FC } from "react";
import { Box } from "@mui/material";
import { Hearts } from "react-loader-spinner";

export const LoadingSpinner: FC = () => {
  return (
    <Box
      mt={10}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Hearts
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible
      />
    </Box>
  );
};
