import React from "react";
import { Card } from "react-bootstrap";

const DashboardSuperAdmin = () => {
  return (
    <Card className="p-4 shadow-sm">
      <h4>Bienvenido al Panel del Dueño</h4>
      <p>
        Desde aquí puede operar como Socio, Administrador y Gestionar Usuarios.
      </p>
    </Card>
  );
};

export default DashboardSuperAdmin;
