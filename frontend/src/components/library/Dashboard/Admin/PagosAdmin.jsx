import React, { useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const usuariosIniciales = [
  { id: 1, nombre: "Juan Perez", estadoCuota: "vencido", historialPagos: [] },
  { id: 2, nombre: "Ana García", estadoCuota: "vencido", historialPagos: [] },
];

const PagosAdmin = () => {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [montos, setMontos] = useState({});
  const [fechas, setFechas] = useState({});

  const registrarPago = (usuarioId) => {
    const monto = montos[usuarioId];
    const fecha = fechas[usuarioId];

    if (!monto || !fecha) {
      toast.error("Completa monto y fecha");
      return;
    }

    const usuariosActualizados = usuarios.map((usuario) =>
      usuario.id === usuarioId
        ? {
            ...usuario,
            estadoCuota: "al-dia",
            historialPagos: [...usuario.historialPagos, { monto, fecha }],
          }
        : usuario
    );

    setUsuarios(usuariosActualizados);
    toast.success("Pago registrado con éxito");

    // Limpiar solo los campos de ese usuario
    setMontos((prev) => ({ ...prev, [usuarioId]: "" }));
    setFechas((prev) => ({ ...prev, [usuarioId]: "" }));
  };

  return (
    <div className="container mt-4">
      <h4>Registrar Pagos</h4>
      <Row>
        {usuarios.map((usuario) => (
          <Col md={6} lg={4} key={usuario.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{usuario.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Estado cuota:{" "}
                  <span
                    className={
                      usuario.estadoCuota === "al-dia"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {usuario.estadoCuota}
                  </span>
                </Card.Subtitle>

                <Form>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="number"
                      placeholder="Monto"
                      value={montos[usuario.id] || ""}
                      onChange={(event) =>
                        setMontos({ ...montos, [usuario.id]: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="date"
                      value={fechas[usuario.id] || ""}
                      onChange={(event) =>
                        setFechas({ ...fechas, [usuario.id]: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={() => registrarPago(usuario.id)}
                  >
                    Registrar Pago
                  </Button>
                </Form>

                <hr />
                <h6>Historial</h6>
                {usuario.historialPagos.length === 0 ? (
                  <p className="text-muted">Sin pagos aún</p>
                ) : (
                  <ul className="list-unstyled">
                    {usuario.historialPagos.map((p, i) => (
                      <li key={i}>
                        💲<strong>{p.monto}</strong> — 📅 {p.fecha}
                      </li>
                    ))}
                  </ul>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PagosAdmin;
