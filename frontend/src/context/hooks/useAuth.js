import { useContext } from "react";
import AuthContext from "../AuthContext/AuthContext";

//Creo el hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Error");
  }

  return context;
};

export default useAuth;
