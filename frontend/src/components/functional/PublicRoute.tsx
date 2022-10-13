import { FC, useContext } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { LoadingColorRing } from "../ui/LoadingColorRing";

export const PublicRoute: FC<RouteProps> = ({ children }) => {
  const { isLoading, isSignedIn } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingColorRing />;
  }

  if (isSignedIn) {
    return <Navigate to="/teams" />;
  }
  return <div>{children}</div>;
};
