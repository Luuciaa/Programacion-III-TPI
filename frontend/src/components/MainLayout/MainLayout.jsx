import React from "react";
import { Outlet } from "react-router-dom";


const MainLayout = () => {
  return (
    <div>
      {/* Aca se renderizan las rutas hijas */}
      <Outlet />
    </div>
  );
};

export default MainLayout;
