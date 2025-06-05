import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../context/hooks/useAuth";

const NotFound = () => {
  const navigate = useNavigate();
  const { logeado } = useAuth(); // Se usa logeado para verificar si el usuario está autenticado.

  const goBackHomeHandler = () => {
    if (logeado) {
      navigate("/dashboard"); // Si está logueado, lo mandamos al dashboard
    } else {
      navigate("/home"); // Si no está logueado, lo mandamos al home
    }
  };

  const goBackLoginHandler = () => {
    navigate("/login"); // Si el usuario no tiene acceso a ninguna parte, redirige a login
  };

  return (
    <div className="text-center mb-3">
      <h2>¡Ups! La página solicitada no fue encontrada</h2>
      <Button
        className="m-2"
        variant="outline-primary"
        onClick={goBackHomeHandler}
      >
        Volver al Inicio
      </Button>
      <Button
        className="m-2"
        variant="outline-secondary"
        onClick={goBackLoginHandler}
      >
        Volver a Iniciar Sesión
      </Button>
    </div>
  );
};

export default NotFound;
