import { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import hydrangea from "../../images/hydrangea.png";
import { AuthContext } from "../../providers/AuthProvider";

export const NotFound = () => {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <Grid2 container rowSpacing={8} columnSpacing={3}>
      <Grid2 xs={12}>
        <Typography variant="h4" component="div">
          404 Not Found
        </Typography>
      </Grid2>
      <Grid2 xs={6}>
        <Box sx={{ width: 300, height: 300 }}>
          <img src={hydrangea} alt="紫陽花" width="100%" height="100%" />
        </Box>
      </Grid2>
      <Grid2 xs={6}>
        <Stack direction="column" spacing={3} alignItems="flex-start">
          <Typography variant="body1" component="div">
            ページが見つかりませんでした。
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to={isSignedIn ? "/teams" : "/"}
          >
            ホームへ戻る
          </Button>
        </Stack>
      </Grid2>
    </Grid2>
  );
};
