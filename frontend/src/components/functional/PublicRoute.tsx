import { FC, useContext } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { LoadingSpinner } from "../ui/LoadingSpinner";

const PublicRoute: FC<RouteProps> = ({ children }) => {
  const { loading, isSignedIn, currentUser } = useContext(AuthContext);

  if (!loading) {
    if (!isSignedIn) {
      return <div>{children}</div>;
    }
    return <Navigate to={`/teams/${currentUser?.team_id}`} />;
  }

  return <LoadingSpinner />;
};

export default PublicRoute;
