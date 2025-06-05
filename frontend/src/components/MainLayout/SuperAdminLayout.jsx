import React from "react";
import { Outlet } from "react-router-dom";
import SidebarSuperAdmin from "../library/Dashboard/SuperAdmin/SidebarSuperAdmin";
import NavBarSuperAdmin from "./NavBarSuperAdmin/NavBarSuperAdmin";
import Footer from "./Footer/Footer";

const SuperAdminLayout = ({ user, onLogout }) => {
  return (
    <div className="d-flex">
      {/* Sidebar visible solo en md+ */}
      <div className="d-none d-md-block bg-light border-end" style={{ width: "240px", minHeight: "100vh" }}>
        <SidebarSuperAdmin />
      </div>
      
      <div className="flex-grow-1 d-flex flex-column min-vh-100">
        <NavBarSuperAdmin user={user} onLogout={onLogout} />

        <main className="flex-grow-1 p-4">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default SuperAdminLayout;
