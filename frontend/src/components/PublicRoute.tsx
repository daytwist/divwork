import { Box, CircularProgress, Container } from "@mui/material";
import { FC, useContext } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const PublicRoute: FC<RouteProps> = ({ children }) => {
  const { loading, isSignedIn, currentUser } = useContext(AuthContext);

  if (!loading) {
    if (!isSignedIn) {
      return <div>{children}</div>;
    }
    return <Navigate to={`/teams/${currentUser?.team_id}`} />;
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

export default PublicRoute;
