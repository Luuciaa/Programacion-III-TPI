import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import AuthContext from "../../context/AuthContext/AuthContext";

const LogoutSection = ({ className = "" }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div
      className={`text-center mt-3 p-3 border-top border-light ${className}`}
    >
      <p className="mb-2 text-muted">
        <FaUserCircle className="me-2" size={20} />
        Hola, <strong>{user?.nombre || "Usuario"}</strong>
      </p>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={logout}
        className="d-flex align-items-center mx-auto"
      >
        <FaSignOutAlt className="me-2" />
        Cerrar sesión
      </Button>
    </div>
  );
};

export default LogoutSection;
