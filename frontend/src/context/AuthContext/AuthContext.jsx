import { createContext, useState } from "react";

// Creo el contexto
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [logeado, setLogeado] = useState(false); 

  
  const logout = () => {
    setUser(null);
    setLogeado(false);
    localStorage.removeItem("token"); 
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logeado,
        setLogeado,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
