import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";

const PerfilUser = ({ datosUsuario, onGuardarCambios }) => {
  const [perfil, setPerfil] = useState({ ...datosUsuario });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPerfil({ ...perfil, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onGuardarCambios(perfil); // Enviar datos al backend o contexto
    toast.success("Perfil actualizado correctamente");
  };

  return (
    <Card className="shadow-sm p-4 mt-4">
      <h4 className="mb-4">Mi Perfil</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={perfil.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={perfil.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="direccion">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            name="direccion"
            value={perfil.direccion}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Guardar cambios
        </Button>
      </Form>
    </Card>
  );
};

export default PerfilUser;
