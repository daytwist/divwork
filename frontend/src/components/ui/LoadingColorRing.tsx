import { Box } from "@mui/material";
import { ColorRing } from "react-loader-spinner";

export const LoadingColorRing = () => {
  return (
    <Box
      mt={20}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ColorRing
        visible
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#429EA6"]}
      />
    </Box>
  );
};
