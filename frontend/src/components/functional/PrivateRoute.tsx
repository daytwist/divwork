import { FC, useContext } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { LoadingColorRing } from "../ui/LoadingColorRing";

export const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const { isLoading, isSignedIn } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingColorRing />;
  }

  if (isSignedIn) {
    return <div>{children}</div>;
  }
  return <Navigate to="/sign_in" />;
};
