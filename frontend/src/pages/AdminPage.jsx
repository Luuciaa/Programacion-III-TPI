import React from "react";
import NavBarAdmin from "../components/MainLayout/NavBarAdmin/NavBarAdmin";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <div style={{ display: "flex" }}>

      <NavBarAdmin />
      
      <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
