import { useCallback } from "react";
import { Box, Theme, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export const Footer = () => {
  const zIndex = useCallback((theme: Theme) => theme.zIndex.drawer + 2, []);

  return (
    <Box
      position="absolute"
      component="footer"
      sx={{
        zIndex,
        backgroundColor: "#455a64",
        width: "100%",
        height: 50,
      }}
    >
      <Grid2
        container
        width="100%"
        height="100%"
        alignContent="center"
        justifyContent="center"
      >
        <Grid2>
          <Typography variant="body1" component="div" color="white">
            Copyright ©️ 2022 DivWork
          </Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
};
