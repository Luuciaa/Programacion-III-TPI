import React, { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PagosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [montos, setMontos] = useState({});
  const [fechas, setFechas] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  // Carga usuarios desde API
  useEffect(() => {
    fetch("/api/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch(() => toast.error("Error al cargar usuarios"));
  }, []);

  const abrirModalPago = (usuarioId) => {
    setUsuarioSeleccionado(usuarioId);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setUsuarioSeleccionado(null);
  };

  // Confirmar y enviar pago
  const confirmarPago = async () => {
    if (!usuarioSeleccionado) return;

    const monto = montos[usuarioSeleccionado];
    const fecha = fechas[usuarioSeleccionado];

    if (!monto || !fecha) {
      toast.error("Completa monto y fecha");
      return;
    }

    try {
      const res = await fetch(`/api/usuarios/${usuarioSeleccionado}/pagos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ monto, fecha }),
      });

      if (!res.ok) throw new Error("Error al registrar pago");

      // Actualizo la lista local con nuevo estado al día y pago agregado
      const usuarioActualizado = await res.json();
      setUsuarios((prev) =>
        prev.map((u) => (u.id === usuarioActualizado.id ? usuarioActualizado : u))
      );

      toast.success("Pago registrado con éxito");
      setMontos((prev) => ({ ...prev, [usuarioSeleccionado]: "" }));
      setFechas((prev) => ({ ...prev, [usuarioSeleccionado]: "" }));
      cerrarModal();
    } catch {
      toast.error("No se pudo registrar el pago");
    }
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
                      usuario.estadoCuenta === "Pagada"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {usuario.estadoCuenta.toLowerCase()}
                  </span>
                </Card.Subtitle>

                <Form>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="number"
                      placeholder="Monto"
                      value={montos[usuario.id] || ""}
                      onChange={(e) =>
                        setMontos({ ...montos, [usuario.id]: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="date"
                      value={fechas[usuario.id] || ""}
                      onChange={(e) =>
                        setFechas({ ...fechas, [usuario.id]: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={() => abrirModalPago(usuario.id)}
                  >
                    Registrar Pago
                  </Button>
                </Form>

                <hr />
                <h6>Historial</h6>
                {(!usuario.historialPagos || usuario.historialPagos.length === 0) ? (
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

      {/* Modal confirmación pago */}
      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Registrar pago de monto {montos[usuarioSeleccionado]} en fecha {fechas[usuarioSeleccionado]}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmarPago}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PagosAdmin;

