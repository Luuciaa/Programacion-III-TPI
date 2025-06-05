// src/components/library/Dashboard/SuperAdmin/SidebarSuperAdmin.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserPlus, FaEdit, FaTrash, FaExchangeAlt, FaTachometerAlt } from "react-icons/fa";
import "./SidebarSuperAdmin.css"; 

const SidebarSuperAdmin = () => {
  return (
    <div
      className="bg-dark text-white d-flex flex-column p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h4 className="text-center mb-4">Super Admin</h4>

      <NavLink
        to="/superadmin"
        end
        className={({ isActive }) =>
          `nav-link text-white ${isActive ? "fw-bold text-warning" : ""}`
        }
      >
        <FaTachometerAlt className="me-2" />
        Dashboard
      </NavLink>

      <NavLink
        to="/superadmin/alta-usuario"
        className={({ isActive }) =>
          `nav-link text-white ${isActive ? "fw-bold text-warning" : ""}`
        }
      >
        <FaUserPlus className="me-2" />
        Alta Usuario
      </NavLink>

      <NavLink
        to="/superadmin/editar-usuario"
        className={({ isActive }) =>
          `nav-link text-white ${isActive ? "fw-bold text-warning" : ""}`
        }
      >
        <FaEdit className="me-2" />
        Editar Usuario
      </NavLink>

      <NavLink
        to="/superadmin/eliminar-usuario"
        className={({ isActive }) =>
          `nav-link text-white ${isActive ? "fw-bold text-warning" : ""}`
        }
      >
        <FaTrash className="me-2" />
        Eliminar Usuario
      </NavLink>

      <NavLink
        to="/superadmin/cambio-rol"
        className={({ isActive }) =>
          `nav-link text-white ${isActive ? "fw-bold text-warning" : ""}`
        }
      >
        <FaExchangeAlt className="me-2" />
        Cambio de Rol
      </NavLink>
    </div>
  );
};

export default SidebarSuperAdmin;

