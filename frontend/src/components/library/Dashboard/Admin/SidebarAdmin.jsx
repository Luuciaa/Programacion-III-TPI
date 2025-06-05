import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom"; // Mejor que Link para rutas activas
import "bootstrap-icons/font/bootstrap-icons.css";

const SidebarAdmin = () => {
  return (
    <div
      className="d-flex flex-column bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h4 className="text-center mb-4">Panel Admin</h4>

      <Nav className="flex-column">
        <Nav.Link
          as={NavLink}
          to="/admin"
          end
          className="text-white"
          activeClassName="active"
        >
          <i className="bi bi-house-door me-2" /> Inicio
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to="/admin/usuarios"
          className="text-white"
          activeClassName="active"
        >
          <i className="bi bi-people me-2" /> Usuarios
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to="/admin/pagos"
          className="text-white"
          activeClassName="active"
        >
          <i className="bi bi-cash-stack me-2" /> Registrar pagos
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to="/admin/actividades"
          className="text-white"
          activeClassName="active"
        >
          <i className="bi bi-calendar2-check me-2" /> Actividades
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to="/admin/reservas"
          className="text-white"
          activeClassName="active"
        >
          <i className="bi bi-journal-check me-2" /> Reservas
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to="/admin/asistencias"
          className="text-white"
          activeClassName="active"
        >
          <i className="bi bi-person-check me-2" /> Asistencias
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default SidebarAdmin;

