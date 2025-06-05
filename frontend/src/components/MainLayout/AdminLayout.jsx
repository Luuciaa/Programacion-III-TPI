import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../library/Dashboard/Admin/SidebarAdmin";
import NavBarAdmin from "./NavBarAdmin/NavBarAdmin";
import Footer from "./Footer/Footer";

const AdminLayout = ({ user, onLogout }) => {
  return (
    <div className="d-flex">
      {/* Sidebar visible solo en md+ */}
      <div className="d-none d-md-block bg-light border-end" style={{ width: "240px", minHeight: "100vh" }}>
        <SidebarAdmin />
      </div>

      {/* Contenedor principal */}
      <div className="flex-grow-1 d-flex flex-column min-vh-100">
        <NavBarAdmin user={user} onLogout={onLogout} />

        <main className="flex-grow-1 p-4">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
