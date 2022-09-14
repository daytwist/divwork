import { FC, useContext } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { LoadingColorRing } from "../ui/LoadingColorRing";

const NormalUserRoute: FC<RouteProps> = ({ children }) => {
  const { loading, currentUser } = useContext(AuthContext);

  if (loading) {
    return <LoadingColorRing />;
  }

  if (currentUser?.email === "guest@example.com") {
    return <Navigate to={`/teams/${currentUser?.team_id}`} />;
  }
  return <div>{children}</div>;
};

export default NormalUserRoute;
