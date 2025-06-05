import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../context/hooks/useAuth";

const AuthLayout = ({ allowedRoles }) => {
  const { logeado, user } = useAuth();

  if (!logeado) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.rol)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;

/*useAuth(): Obtiene el estado de autenticación desde tu contexto personalizado.

Logeado: Si es false, redirige automáticamente al usuario a la página de login.

Outlet: Renderiza las rutas hijas protegidas si el usuario está autenticado.*/
