import React from "react";
import { Outlet } from "react-router-dom";
import SidebarUsuario from "../library/Dashboard/Usuario/SidebarUsuario";
import NavBarUser from "./NavBarUser/NavBarUser";
import Footer from "./Footer/Footer";

const UserLayout = ({ user, onLogout }) => {
  return (
    <div className="d-flex">
       {/* Sidebar visible solo en md+ */}
      <div className="d-none d-md-block bg-light border-end" style={{ width: "240px", minHeight: "100vh" }}>
        <SidebarUsuario />
      </div>
      
      
      <div className="flex-grow-1 d-flex flex-column min-vh-100">
        <NavBarUser user={user} onLogout={onLogout} />
        
        <main className="flex-grow-1 p-4">
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
