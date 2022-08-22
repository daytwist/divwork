import { Box, CircularProgress, Container } from "@mui/material";
import { FC, useContext } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const { loading, isSignedIn } = useContext(AuthContext);

  if (!loading) {
    if (isSignedIn) {
      return <div>{children}</div>;
    }
    return <Navigate to="/sign_in" />;
  }

  return (
    <Container maxWidth="sm">
      <Box
        mt={15}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    </Container>
  );
};

export default PrivateRoute;
