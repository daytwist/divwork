import { FC, useContext } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { LoadingColorRing } from "../ui/LoadingColorRing";

export const AdminRoute: FC<RouteProps> = ({ children }) => {
  const { loading, currentUser, isSignedIn } = useContext(AuthContext);

  if (loading) {
    return <LoadingColorRing />;
  }

  if (isSignedIn) {
    if (currentUser?.admin) {
      return <div>{children}</div>;
    }
    return <Navigate to="/teams" />;
  }

  return <Navigate to="/sign_in" />;
};
