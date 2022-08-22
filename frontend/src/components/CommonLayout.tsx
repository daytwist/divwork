import { css, Global } from "@emotion/react";
import { Box, Container, Grid } from "@mui/material";
import { FC } from "react";
import { RouteProps } from "react-router-dom";
import Header from "./Header";

const CommonLayout: FC<RouteProps> = ({ children }) => {
  const global = css`
    * {
      margin: 0;
    }
  `;

  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Global styles={global} />
        <Box m={2} pt={4}>
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
