import { Navigate } from "react-router-dom";
import useAuth from "../context/hooks/useAuth";

const RutaPrivadaPorRol = ({ children, rol }) => {
  const { logeado, user } = useAuth();

  if (!logeado || user?.rol !== rol) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RutaPrivadaPorRol;
