import { css, Global } from "@emotion/react";
import { Box, Container, Grid } from "@mui/material";
import { FC } from "react";
import { RouteProps } from "react-router-dom";
import Header from "./Header";
import { AlertSnackbar } from "./AlertSnackbar";

const CommonLayout: FC<RouteProps> = ({ children }) => {
  const global = css`
    * {
      margin: 0;
    }
  `;

  return (
    <div>
      <Global styles={global} />
      <header>
        <Header />
      </header>
      <main>
        <AlertSnackbar />
        <Box m={2} py={4}>
          <Container maxWidth="lg">
            <Grid container justifyContent="center">
              <Grid item>{children}</Grid>
            </Grid>
          </Container>
        </Box>
      </main>
    </div>
  );
};

export default CommonLayout;
