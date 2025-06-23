import React from "react";
import { NavLink } from "react-router-dom";

const SidebarUser = () => {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "220px" }}>
      <h5 className="mb-4"> Usuario </h5>
      <ul className="nav flex-column">
        <li>
          <NavLink to="/user" className="nav-link text-white">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/perfil" className="nav-link text-white">
            Mi Perfil
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/clases" className="nav-link text-white">
            Mis Clases
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/reservas" className="nav-link text-white">
            Mis Reservas
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/cuota" className="nav-link text-white">
            Estado de Cuota
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/notificaciones" className="nav-link text-white">
            Notificaciones
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidebarUser;
