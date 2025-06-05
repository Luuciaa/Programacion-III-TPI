import React, { useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";

const ListaClases = ({ actividades, tieneCuotaPaga, onReservar }) => {
  const [filtroDia, setFiltroDia] = useState("");
  const [filtroHora, setFiltroHora] = useState("");

  // Filtrar actividades según día y hora
  const actividadesFiltradas = actividades.filter((actividad) => {
    // Si no hay filtros, mostrar todo
    if (!filtroDia && !filtroHora) return true;

    // Revisar si el día coincide (ejemplo: diasYHorarios = [{dia:"Lunes", hora:"10:00"}, ...])
    const coincideDia = filtroDia
      ? actividad.diasYHorarios.some(
          (d) => d.dia.toLowerCase() === filtroDia.toLowerCase()
        )
      : true;

    // Revisar si la hora coincide o es mayor o igual.
    //El metodo .some() es una funcion del array de JS (que devuelve TRUE, si al menos cumple con la condicion que le pase. Si ningun elemento cumple, devuelve false) para saber si al menos un día y hora dentro de la actividad cumplen.
    const coincideHora = filtroHora
      ? actividad.diasYHorarios.some((d) => d.hora >= filtroHora)
      : true;

    return coincideDia && coincideHora;
  });

  return (
    <div className="mt-4">
      <h4>Lista de Clases</h4>

      <Form className="mb-3">
        <Row>
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Filtrar por día (ej: Lunes)"
              value={filtroDia}
              onChange={(e) => setFiltroDia(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Control
              type="time"
              placeholder="Filtrar por hora"
              value={filtroHora}
              onChange={(e) => setFiltroHora(e.target.value)}
            />
          </Col>
        </Row>
      </Form>

      {actividadesFiltradas.map((actividad, i) => (
        <Card key={i} className="mb-3">
          <Card.Body>
            <Card.Title>{actividad.nombreClase}</Card.Title>
            <Card.Text>
              {actividad.diasYHorarios.map(({ dia, hora }, idx) => (
                <span key={idx}>
                  {dia} - {hora} <br />
                </span>
              ))}
            </Card.Text>
            {tieneCuotaPaga ? (
              <Button onClick={() => onReservar(actividad)} variant="primary">
                Reservar
              </Button>
            ) : (
              <Button variant="secondary" disabled>
                Debes tener la cuota paga para reservar.
              </Button>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ListaClases;
