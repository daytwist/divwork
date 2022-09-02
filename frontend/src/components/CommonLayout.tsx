import { css, Global } from "@emotion/react";
import {
  Box,
  Container,
  createTheme,
  Grid,
  responsiveFontSizes,
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
  let theme = createTheme({
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
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 768,
        lg: 1025,
        xl: 1536,
      },
    },
  });
  theme = responsiveFontSizes(theme);

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
          <Box
            sx={{
              m: { xs: 1, sm: 2 },
              py: { xs: 3, sm: 4 },
            }}
          >
            <Container>
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
