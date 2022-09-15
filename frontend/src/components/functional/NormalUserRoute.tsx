import { FC, useContext } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { LoadingColorRing } from "../ui/LoadingColorRing";

const NormalUserRoute: FC<RouteProps> = ({ children }) => {
  const { loading, currentUser, isSignedIn } = useContext(AuthContext);

  if (loading) {
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

export default NormalUserRoute;
