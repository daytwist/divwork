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
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const CommonLayout: FC<RouteProps> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1de9b6",
        light: "#6effe8",
        dark: "#00b686",
      },
      secondary: {
        main: "#3f50b5",
        light: "#757ce8",
        dark: "#002884",
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
