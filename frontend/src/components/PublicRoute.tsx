import { FC, useContext } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { Box } from "@mui/material";
import { ColorRing } from "react-loader-spinner";
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
    <div>
      <Box
        mt={10}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ColorRing
          visible
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </Box>
    </div>
  );
};

export default PublicRoute;
