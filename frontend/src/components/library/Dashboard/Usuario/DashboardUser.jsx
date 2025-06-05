import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { FaWallet, FaCalendarAlt, FaBell, FaDumbbell } from "react-icons/fa";
import { getColorCuota, getTextoCuota } from "../../../../utils/helpersAdmin";

const DashboardUser = ({ usuario, actividadesHoy, proximaReserva }) => {
  const colorCuota = getColorCuota(usuario.estadoCuota);
  const textoCuota = getTextoCuota(usuario.estadoCuota);
  const cantidadClasesHoy = actividadesHoy.length;
  const notificacionesNuevas = usuario.notificaciones.length;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Bienvenido, {usuario.nombre}</h3>
      <Row className="g-4">
        {/* Estado de Cuota */}
        <Col md={6} lg={3}>
          <Card border={colorCuota} className="shadow h-100">
            <Card.Body className="d-flex align-items-center">
              <FaWallet className="me-3 fs-3 text-secondary" />
              <div>
                <Card.Title className="mb-1">Estado de Cuota</Card.Title>
                <Badge bg={colorCuota}>{textoCuota}</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Clases disponibles hoy */}
        <Col md={6} lg={3}>
          <Card className="shadow h-100">
            <Card.Body className="d-flex align-items-center">
              <FaDumbbell className="me-3 fs-3 text-primary" />
              <div>
                <Card.Title className="mb-1">Clases Hoy</Card.Title>
                <h5>{cantidadClasesHoy}</h5>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Próxima reserva */}
        <Col md={6} lg={3}>
          <Card className="shadow h-100">
            <Card.Body className="d-flex align-items-center">
              <FaCalendarAlt className="me-3 fs-3 text-info" />
              <div>
                <Card.Title className="mb-1">Próxima Reserva</Card.Title>
                {proximaReserva ? (
                  <>
                    <strong>{proximaReserva.clase}</strong>
                    <br />
                    <small>
                      {proximaReserva.fecha} - {proximaReserva.hora}
                    </small>
                  </>
                ) : (
                  <small>No hay reservas próximas</small>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Notificaciones nuevas */}
        <Col md={6} lg={3}>
          <Card className="shadow h-100">
            <Card.Body className="d-flex align-items-center">
              <FaBell className="me-3 fs-3 text-warning" />
              <div>
                <Card.Title className="mb-1">Notificaciones</Card.Title>
                <h5>{notificacionesNuevas}</h5>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardUser;
