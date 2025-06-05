import React from "react";
import NavBarSuperAdmin from "../components/MainLayout/NavBarSuperAdmin/NavBarSuperAdmin";
import { Outlet } from "react-router-dom";

const SuperAdminPage = () => {
  return (
    <div style={{ display: "flex" }}>
      
      <NavBarSuperAdmin />

      <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdminPage;
