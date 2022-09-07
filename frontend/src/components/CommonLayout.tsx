import { FC } from "react";
import { RouteProps } from "react-router-dom";
import { css, Global } from "@emotion/react";
import {
  Box,
  Container,
  createTheme,
  Grid,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { jaJP } from "@mui/x-data-grid";
import Header from "./Header";
import { AlertSnackbar } from "./AlertSnackbar";

const CommonLayout: FC<RouteProps> = ({ children }) => {
  let theme = createTheme(
    {
      palette: {
        primary: {
          main: "#1de9b6",
          light: "#6effe8",
          dark: "#00b686",
        },
        secondary: {
          main: "#5a6abf",
          light: "#8d98f2",
          dark: "#23408e",
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
    },
    jaJP
  );
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
