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
    nombre:"",
    correo: "",
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
      toast.error("Por favor completarlos")
      return;
    }  
  
    /*try {
      const res = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

        if(res.ok) {

          const data = await res.json(); //Captura los datos que responde el back

          toast.success(`¡Registro exitoso! ID: ${data.id}`);

          localStorage.setItem("token", data.token); //Se guarda en el localStorage

          //Limpiar formulario
          setFormData({ 
            nombre: "", 
            correo: "", 
            password: ""
          }); 
          
          setValidated(false);
      } else {
          toast.error("Error al registrar usuario");
        } 
      } catch (err) {
        console.error("Error al enviar los datos: ", err);
    };*/
  }  

  return (
    <div className="d-flex justify-content-center align-content-center vh-100">
      <div id="container-register" className="border p-4 rounded shadow">
        <h2 className="text-center mb-4">Registro</h2>
        
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <div>
              <Form.Group md={6}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  required
                  type="nombre"
                  name="nombre"
                  value={formData.nombre}
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
              <Form.Label>Correo</Form.Label>
              <Form.Control
                required
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="Correo electrónico"
              />
              <Form.Control.Feedback type="invalid">
                Ingresa un Correo Válido
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                required
                type="password"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                minLength={8}
                placeholder="Password"
              />
              <Form.Control.Feedback type="invalid">
                La contraseña debe tener 8 caracteres.
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







