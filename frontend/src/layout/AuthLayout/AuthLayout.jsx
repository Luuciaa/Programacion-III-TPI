import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../context/hooks/useAuth";

const AuthLayout = ({ allowedRoles }) => {
  const { logeado, user } = useAuth();

  if (!logeado) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;


