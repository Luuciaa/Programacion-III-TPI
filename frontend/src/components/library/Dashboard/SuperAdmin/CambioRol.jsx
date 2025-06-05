import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";

const CambiarRol = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const [nuevoRol, setNuevoRol] = useState("Socio");

  // Traer usuarios desde backend al cargar
  useEffect(() => {
    fetch("/api/usuarios")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar usuarios");
        return res.json();
      })
      .then((data) => setUsuarios(data))
      .catch(() => toast.error("Error al cargar los usuarios"));
  }, []);

  const handleCambioRol = (event) => {
    event.preventDefault();

    if (!usuarioSeleccionado) {
      toast.error("Seleccioná un usuario");
      return;
    }

    fetch(`/api/usuarios/${usuarioSeleccionado}/rol`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rol: nuevoRol }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar rol");
        return res.json();
      })
      .then(() => {
        toast.success("Rol actualizado correctamente");
        // Actualizar la lista en pantalla
        setUsuarios((prev) =>
          prev.map((u) =>
            u._id === usuarioSeleccionado ? { ...u, rol: nuevoRol } : u
          )
        );
        setUsuarioSeleccionado("");
        setNuevoRol("Socio");
      })
      .catch(() => toast.error("Error al actualizar el rol"));
  };

  return (
    <Card className="p-4 mt-4 shadow-sm">
      <h4>Cambiar Rol de Usuario</h4>
      <Form onSubmit={handleCambioRol}>
        <Form.Group className="mb-3">
          <Form.Label>Seleccionar Usuario</Form.Label>
          <Form.Select
            value={usuarioSeleccionado}
            onChange={(event) => setUsuarioSeleccionado(event.target.value)}
            required
          >
            <option value=""> Elegí un usuario </option>
            {usuarios.map((u) => (
              <option key={u._id} value={u._id}>
                {u.nombre} ({u.rol})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nuevo Rol</Form.Label>
          <Form.Select
            value={nuevoRol}
            onChange={(event) => setNuevoRol(event.target.value)}
          >
            <option value="Socio">Socio</option>
            <option value="Admin">Admin</option>
            <option value="Super-Admin">Super-Admin</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary">
          Actualizar Rol
        </Button>
      </Form>
    </Card>
  );
};

export default CambiarRol;
