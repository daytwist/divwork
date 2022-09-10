import { FC, useContext } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { LoadingColorRing } from "../ui/LoadingColorRing";

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const { loading, isSignedIn } = useContext(AuthContext);

  if (!loading) {
    if (isSignedIn) {
      return <div>{children}</div>;
    }
    return <Navigate to="/sign_in" />;
  }

  return <LoadingColorRing />;
};

export default PrivateRoute;
