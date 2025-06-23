import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

// Creo el contexto
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [logeado, setLogeado] = useState(false); 

    const loginUser = (token) => {
      try {
        const decoded = jwtDecode(token);

        const userData = {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
        };
        setUser(userData);
        setLogeado(true);
        localStorage.setItem("token", token);
      } catch (error) {
        console.error("Token inválido:", error);
      }
    };
  
  const logout = () => {

    setUser(null);  //Delete user data from the context
    setLogeado(false); //Marks that the user is no longer logged in
    localStorage.removeItem("token"); //Delete the saved token
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logeado,
        setLogeado,
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
