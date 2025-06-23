import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditarUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/user/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            nombre: data.nombre,
            email: data.email,
            role: data.role,
          });
        } else {
          toast.error("No se pudo cargar el usuario");
        }
      } catch (error) {
        console.error("Error en la petición GET:", error);
        toast.error("Error de conexión con el servidor");
      }
    };

    fetchUsuario();
  }, [id]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setValidated(true);
      toast.error("Completá los campos obligatorios");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Usuario actualizado correctamente");
        setTimeout(() => navigate("/superadmin/usuarios"), 2000);
      } else {
        toast.error("Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error en la petición PUT:", error);
      toast.error("Error de conexión con el servidor");
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <Card className="p-4 shadow-sm">
        <h3 className="mb-4 text-center">Editar Usuario</h3>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre"
            />
            <Form.Control.Feedback type="invalid">
              Ingresá un nombre válido
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
            />
            <Form.Control.Feedback type="invalid">
              Ingresá un correo válido
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar rol</option>
              <option value="socio">Socio</option>
              <option value="admin">Admin</option>
              <option value="superadmin">SuperAdmin</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Seleccioná un rol válido
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid">
            <Button type="submit" variant="outline-primary">
              Guardar Cambios
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default EditarUsuario;

