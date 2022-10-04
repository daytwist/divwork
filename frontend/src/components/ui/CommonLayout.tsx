import { FC, useContext } from "react";
import { RouteProps, useLocation } from "react-router-dom";
import { css, Global } from "@emotion/react";
import {
  Box,
  Container,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { jaJP } from "@mui/x-data-grid";
import MenuBars from "./MenuBars";
import { AlertSnackbar } from "./AlertSnackbar";
import { Footer } from "./Footer";
import { RecommendBar } from "./RecommendBar";
import { AuthContext } from "../../providers/AuthProvider";

const CommonLayout: FC<RouteProps> = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const location = useLocation();

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

  const styles = {
    "*": css`
      margin: 0;
    `,

    main: css`
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - 50px);
    `,

    footer: css`
      margin-top: auto;
    `,
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Global styles={styles} />
        <AlertSnackbar />
        <Box sx={{ display: "flex" }}>
          <MenuBars />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Toolbar />
            <Container sx={{ px: 3, py: 6 }}>
              <Grid2 container justifyContent="center">
                <Grid2>{children}</Grid2>
              </Grid2>
            </Container>
            {!loading && location.pathname === "/" ? <RecommendBar /> : null}
          </Box>
        </Box>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default CommonLayout;
