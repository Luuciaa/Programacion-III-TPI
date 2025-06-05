import React from "react";
import { Card, Badge } from "react-bootstrap";
import { getColorCuota } from "../../utils/getColorCuota";

const EstadoCuota = ({ estadoCuota }) => {
  const color = getColorCuota(estadoCuota);

  return (
    <Card className="shadow-sm p-3 mt-4">
      <h5>Estado de la Cuota</h5>
      <Badge bg={color}>
        {estadoCuota === "al_dia" ? "Cuota al día" : "Cuota vencida"}
      </Badge>
    </Card>
  );
};

export default EstadoCuota;
