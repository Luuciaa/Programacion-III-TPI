import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getColorCuota } from "../../../../utils/helpersAdmin";

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);

  // Para el modal de edición
  const [showModal, setShowModal] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [nombreEdit, setNombreEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch(() => toast.error("No se pudieron cargar los usuarios"));
  }, []);

  // Función para abrir modal y cargar datos
  const abrirModalEditar = (usuario) => {
    setUsuarioEditar(usuario);
    setNombreEdit(usuario.name);
    setEmailEdit(usuario.email);
    setShowModal(true);
  };

  // Guardar cambios edición
  const guardarCambios = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${usuarioEditar.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nombreEdit, email: emailEdit }),
      });
      if (!res.ok) throw new Error("Error al actualizar");

      const data = await res.json();
      toast.success("Usuario actualizado");
      setUsuarios((prev) =>
        prev.map((u) => (u.id === usuarioEditar.id ? data.user || data : u))
      );
      setShowModal(false);
    } catch {
      toast.error("No se pudo actualizar el usuario");
    }
  };

  // Eliminar usuario
  const handleEliminar = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar");

      toast.success("Usuario eliminado");
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch {
      toast.error("No se pudo eliminar el usuario");
    }
  };

  // Registrar pago: simulamos actualización estadoCuenta a "Pagada"
  const handleRegistrarPago = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estadoCuenta: "Pagada" }),
      });
      if (!res.ok) throw new Error("Error al registrar pago");

      const data = await res.json();
      toast.success("Pago registrado");
      setUsuarios((prev) =>
        prev.map((u) => (u.id === id ? data.user || data : u))
      );
    } catch {
      toast.error("No se pudo registrar el pago");
    }
  };

  return (
    <div className="container mt-4">
      <h4>Gestión de Usuarios</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado de Cuota</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(({ id, name, email, estadoCuenta }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{email}</td>
              <td>
                <Badge bg={getColorCuota(estadoCuenta)}>
                  {estadoCuenta === "Pagada" ? "Al día" : "Vencido"}
                </Badge>
              </td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => abrirModalEditar({ id, name, email })}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleRegistrarPago(id)}
                  className="me-2"
                >
                  Registrar Pago
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleEliminar(id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre" className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombreEdit}
                onChange={(e) => setNombreEdit(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={emailEdit}
                onChange={(e) => setEmailEdit(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarCambios}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsuariosAdmin;
