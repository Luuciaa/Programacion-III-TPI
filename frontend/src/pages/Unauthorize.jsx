import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <h1>401 - No autorizado</h1>
      <p>No tenés permiso para acceder a esta página.</p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </div>
  );
};

export default Unauthorized;
