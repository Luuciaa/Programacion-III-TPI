import React, {useContext} from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import SidebarUsuario from "../library/Dashboard/Usuario/SidebarUser";
import NavBarUser from "./NavBarUser/NavBarUser";
import Footer from "./Footer/Footer";

const UserLayout = () => {

  const { user, logout } = useContext(AuthContext);

  return (
    <div className="d-flex">
       {/* Sidebar visible solo en md+ */}
      <div className="d-none d-md-block bg-light border-end" style={{ width: "240px", minHeight: "100vh" }}>
        <SidebarUsuario />
      </div>
      
      <div className="flex-grow-1 d-flex flex-column min-vh-100">
        <NavBarUser user={user} onLogout={logout} />
        
        <main className="flex-grow-1 p-4">
          <Outlet />
        </main>
        
        <Footer />
      </div>
      
    </div>
  );
};

export default UserLayout;
