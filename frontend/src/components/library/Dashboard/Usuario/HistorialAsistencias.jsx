import React from "react";
import { Card, ListGroup, Badge } from "react-bootstrap";

const HistorialAsistencias = ({ reservasPasadas }) => {
  return (
    <Card className="p-4 mt-4 shadow-sm">
      <h4>Historial de Asistencias</h4>
      {reservasPasadas.length === 0 ? (
        <p>No hay reservas pasadas.</p>
      ) : (
        <ListGroup variant="flush">
          {reservasPasadas.map((reserva) => (
            <ListGroup.Item
              key={reserva.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{reserva.clase}</strong> <br />
                <small>
                  {reserva.fecha} - {reserva.hora}
                </small>
              </div>
              <Badge bg={reserva.estado === "Asistió" ? "success" : "danger"}>
                {reserva.estado === "Asistió" ? " Asistió" : " Faltó"}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Card>
  );
};

export default HistorialAsistencias;
