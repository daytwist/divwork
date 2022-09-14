import { FC, useContext } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { LoadingColorRing } from "../ui/LoadingColorRing";

const PublicRoute: FC<RouteProps> = ({ children }) => {
  const { loading, isSignedIn, currentUser } = useContext(AuthContext);

  if (loading) {
    <LoadingColorRing />;
  }

  if (isSignedIn) {
    <Navigate to={`/teams/${currentUser?.team_id}`} />;
  }
  return <div>{children}</div>;
};

export default PublicRoute;
