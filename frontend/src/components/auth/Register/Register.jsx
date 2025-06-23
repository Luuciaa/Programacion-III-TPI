import React from 'react'
import { useState } from 'react';
import { Form, Button, Row} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistroForm = () => {

  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setValidated(true);
      toast.error("Por favor completalos correctamente")
      return;
    }  
    

    console.log('Datos enviados al backend: ', formData)

    try {
      const res = await fetch("http://localhost:3000/api/auth/register",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if(res.ok) {
        const data = await res.json();

        toast.success(`¡Registro exitoso! ID: ${data.id}`);

        localStorage.setItem("token", data.token);

        // Limpiar formulario
        setFormData({ 
          name: "", 
          email: "", 
          password: ""
        }); 
        
        setValidated(false);

        
        navigate("/login");

      } else {
        toast.error("Error al registrar usuario");
      } 
    } catch (err) {
      console.error("Error al enviar los datos: ", err);
      toast.error("Error en la comunicación con el servidor");
    };
  }  

  return (
    <div className="d-flex justify-content-center align-content-center vh-100">
      <div
        style={{ width: "100%", maxWidth: 420 }}
        className="p-4 border rounded shadow bg-white"
      >
        <h2 className="text-center mb-4">Registro</h2>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <div>
              <Form.Group md={6}>
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
                  Ingresa tu Nombre
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Row>

          <div>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <Form.Control.Feedback type="invalid">
                Ingresa un Email Válido
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength={6}
                placeholder="Password"
              />
              <Form.Control.Feedback type="invalid">
                La contraseña debe tener al menos 6 caracteres.
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="d-grid mb-3">
            <Button type="submit" variant="outline-secondary" className="w-100">
              Registrarse
            </Button>
          </div>

          <div className="d-grid mb-3">
            <Button
              variant="outline-secondary"
              className="w-100"
              onClick={() => navigate("/")}
            >
              <i className="bi bi-box-arrow-in-right"></i> Volver a Inicio
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default RegistroForm;








