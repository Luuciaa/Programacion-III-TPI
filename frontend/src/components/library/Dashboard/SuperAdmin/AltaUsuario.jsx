import React, { useState } from "react";
import { Form, Button} from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AltaUsuario = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    role: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setValidated(true);
      toast.error("Por favor, completá todos los campos correctamente.");
      return;
    }

    try {
      const res = await fetch("/api/superadmin/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(`¡Usuario creado! ID: ${data.id}`);
        setFormData({ nombre: "", correo: "", password: "", role: "" });
        setValidated(false);
      } else {
        toast.error("Error al registrar usuario.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Ocurrió un error al conectar con el servidor.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="border p-4 rounded shadow"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h3 className="text-center mb-4">Alta de Usuario</h3>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingrese el nombre"
            />
            <Form.Control.Feedback type="invalid">
              Ingresar un nombre
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              required
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Ingrese el correo"
            />
            <Form.Control.Feedback type="invalid">
              Ingresar un correo válido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              placeholder="Mínimo 6 caracteres"
            />
            <Form.Control.Feedback type="invalid">
              La contraseña debe tener 6 caracteres.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              required
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Seleccionar rol</option>
              <option value="socio">Socio</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Seleccioná un rol
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Crear Usuario
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AltaUsuario;
