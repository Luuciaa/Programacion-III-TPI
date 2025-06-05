import { createContext, useState } from "react";

// Creo el contexto
const AuthContext = createContext();

// Creo el provider que envuelve la app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Info del usuario logueado
  const [logeado, setLogeado] = useState(false); // Estado global de login

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setLogeado(false);
    localStorage.removeItem("token"); // Si usás token
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logeado,
        setLogeado,
        logout, // ✅ ahora disponible en cualquier parte de la app
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
