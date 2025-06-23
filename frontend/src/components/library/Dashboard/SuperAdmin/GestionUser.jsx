import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioNuevo, setUsuarioNuevo] = useState({
    name: "",
    email: "",
    role: "socio",
  });
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Cargar usuarios al montar
  useEffect(() => {
    fetch("http://localhost:3000/api/user")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar usuarios");
        return res.json();
      })
      .then((data) => setUsuarios(data))
      .catch(() => toast.error("Error al cargar usuarios"));
  }, []);

  // Crear usuario
  const handleCrearUsuario = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioNuevo),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al crear usuario");
        return res.json();
      })
      .then((data) => {
        setUsuarios([...usuarios, data]);
        setUsuarioNuevo({ name: "", email: "", role: "socio" });
        toast.success("Usuario creado");
      })
      .catch(() => toast.error("Error al crear usuario"));
  };

  // Abrir modal para editar
  const handleEditar = (usuario) => {
    setUsuarioEditando({ ...usuario });
    setMostrarModal(true);
  };

  // Guardar cambios editados
  const guardarCambios = () => {
    fetch(`http://localhost:3000/api/user/${usuarioEditando.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioEditando),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar usuario");
        return res.json();
      })
      .then(() => {
        const actualizados = usuarios.map((u) =>
          u.id === usuarioEditando.id ? usuarioEditando : u
        );
        setUsuarios(actualizados);
        setMostrarModal(false);
        toast.success("Usuario actualizado");
      })
      .catch(() => toast.error("Error al actualizar usuario"));
  };

  // Eliminar usuario
  const handleEliminar = (id) => {
    fetch(`http://localhost:3000/api/user/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar usuario");
        setUsuarios(usuarios.filter((u) => u.id !== id));
        toast.success("Usuario eliminado");
      })
      .catch(() => toast.error("Error al eliminar usuario"));
  };

  return (
    <div className="container mt-4">
      <h4>Alta de Usuario</h4>
      <Form onSubmit={handleCrearUsuario} className="mb-4">
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Nombre"
            value={usuarioNuevo.name}
            onChange={(event) =>
              setUsuarioNuevo({ ...usuarioNuevo, nombre: event.target.value })
            }
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="email"
            placeholder="Email"
            value={usuarioNuevo.email}
            onChange={(event) =>
              setUsuarioNuevo({ ...usuarioNuevo, email: event.target.value })
            }
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Select
            value={usuarioNuevo.role}
            onChange={(event) =>
              setUsuarioNuevo({ ...usuarioNuevo, role: event.target.value })
            }
          >
            <option value="socio">Socio</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super-Admin</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="success">
          Crear Usuario
        </Button>
      </Form>

      <h4>Lista de Usuarios</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.name}</td>
              <td>{usuario.email}</td>
              <td>{usuario.role}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditar(usuario)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleEliminar(usuario.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {usuarioEditando && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={usuarioEditando.name}
                  onChange={(event) =>
                    setUsuarioEditando({
                      ...usuarioEditando,
                      nombre: event.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={usuarioEditando.email}
                  onChange={(event) =>
                    setUsuarioEditando({
                      ...usuarioEditando,
                      email: event.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Rol</Form.Label>
                <Form.Select
                  value={usuarioEditando.role}
                  onChange={(event) =>
                    setUsuarioEditando({
                      ...usuarioEditando,
                      role: event.target.value,
                    })
                  }
                >
                  <option value="socio">Socio</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super-Admin</option>
                </Form.Select>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarCambios}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GestionUsuarios;


