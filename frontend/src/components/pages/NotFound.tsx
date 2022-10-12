/** @jsxImportSource @emotion/react */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import { css } from "@emotion/react";
import hydrangea from "../../images/hydrangea.png";
import { AuthContext } from "../../providers/AuthProvider";

export const NotFound = () => {
  const { isSignedIn } = useContext(AuthContext);

  const imgStyle = css`
    width: 100%;
    height: 100%;
  `;

  return (
    <Stack
      alignItems="flex-start"
      sx={{ flexDirection: { xs: "column", sm: "row" }, pt: 5 }}
    >
      <Box
        sx={{
          width: { xs: 200, sm: 250, md: 300 },
          height: { xs: 200, sm: 250, md: 300 },
          mr: { xs: 0, sm: 5, md: 15 },
          mb: { xs: 5, sm: 0 },
        }}
      >
        <img css={imgStyle} src={hydrangea} alt="紫陽花" />
      </Box>
      <Stack direction="column" spacing={3} alignItems="flex-start">
        <Typography variant="h4" component="div">
          404 Not Found
        </Typography>
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
    </Stack>
  );
};
