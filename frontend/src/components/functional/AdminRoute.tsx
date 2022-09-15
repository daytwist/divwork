import { FC, useContext } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { LoadingColorRing } from "../ui/LoadingColorRing";

const AdminRoute: FC<RouteProps> = ({ children }) => {
  const { loading, currentUser, isSignedIn } = useContext(AuthContext);

  if (loading) {
    return <LoadingColorRing />;
  }

  if (isSignedIn) {
    if (currentUser?.admin) {
      return <div>{children}</div>;
    }
    return <Navigate to={`/teams/${currentUser?.team_id}`} />;
  }

  return <Navigate to="/sign_in" />;
};

export default AdminRoute;
