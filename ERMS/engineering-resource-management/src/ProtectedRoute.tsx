import { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
type Role = "manager" | "engineer";

interface ProtectedRouteProps {
  children: ReactElement;
  role?: Role[];
}

const PrivateRoute: FC<ProtectedRouteProps> = ({ children, role }) => {
  const { response} = useGetCurrentUser();

  if (response.isLoading) {
    return <div>Loading...</div>;
  }

  if ( !response.data) {
    return <Navigate to="/login" replace />;
  }

  if (role && !role.includes(response?.data?.user?.role)) {
    return <div>Unauthorized Access</div>; 
  }

  return children;
};

export default PrivateRoute;
