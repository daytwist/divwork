import { FC, useContext } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { LoadingColorRing } from "../ui/LoadingColorRing";

const PublicRoute: FC<RouteProps> = ({ children }) => {
  const { loading, isSignedIn } = useContext(AuthContext);

  if (loading) {
    return <LoadingColorRing />;
  }

  if (isSignedIn) {
    return <Navigate to="/teams" />;
  }
  return <div>{children}</div>;
};

export default PublicRoute;
