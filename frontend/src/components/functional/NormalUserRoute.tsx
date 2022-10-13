import { FC, useContext } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { LoadingColorRing } from "../ui/LoadingColorRing";

export const NormalUserRoute: FC<RouteProps> = ({ children }) => {
  const { isLoading, currentUser, isSignedIn } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingColorRing />;
  }

  if (isSignedIn) {
    if (currentUser?.email === "guest@example.com") {
      return <Navigate to={`/users/${currentUser?.id}`} />;
    }
    return <div>{children}</div>;
  }

  return <Navigate to="/sign_in" />;
};
