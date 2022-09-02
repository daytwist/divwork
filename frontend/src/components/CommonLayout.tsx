import { css, Global } from "@emotion/react";
import {
  Box,
  Container,
  createTheme,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { FC } from "react";
import { RouteProps } from "react-router-dom";
import Header from "./Header";
import { AlertSnackbar } from "./AlertSnackbar";

const CommonLayout: FC<RouteProps> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#69f0ae",
        light: "#9fffe0",
        dark: "#2bbd7e",
      },
      secondary: {
        main: "#5a6abf",
        light: "#8d98f2",
        dark: "#23408e",
      },
    },
  });

  const global = css`
    * {
      margin: 0;
    }
  `;

  return (
    <div>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </div>
  );
};

export default CommonLayout;
