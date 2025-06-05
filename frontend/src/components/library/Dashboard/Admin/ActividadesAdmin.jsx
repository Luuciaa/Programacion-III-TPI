import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const ActividadesAdmin = () => {
  const [actividades, setActividades] = useState([
    {
      id: 1,
      nombre: "Zumba",
      cupoMaximo: 30,
      usuariosInscriptos: 12,
      diasYhorarios: "Lunes y Miércoles 18:00",
    },
    {
      id: 2,
      nombre: "Funcional",
      cupoMaximo: 20,
      usuariosInscriptos: 18,
      diasYhorarios: "Martes y Jueves 19:00",
    },
    {
      id: 3,
      nombre: "Cardio",
      cupoMaximo: 10,
      usuariosInscriptos: 10,
      diasYhorarios: "Lunes y Viernes 18:00",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    nombre: "",
    cupoMaximo: "",
    diasYhorarios: "",
  });

  const handleShowModal = (actividad = null) => {
    if (actividad) {
      setFormData(actividad);
      setEditando(true);
    } else {
      setFormData({ id: null, nombre: "", cupoMaximo: "", diasYhorarios: "" });
      setEditando(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    if ( !formData.nombre || !formData.cupoMaximo || !formData.diasYhorarios) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

  const cupo = Number(formData.cupoMaximo);
    if (isNaN(cupo) || cupo <= 0) {
      toast.error("El cupo máximo debe ser un número mayor a 0");
      return;
    }

    //Guardar/Editar
    if (editando) {
      setActividades((prev) =>
      prev.map((act) =>
        act.id === formData.id 
        ? { ...formData, usuariosInscriptos: act.usuariosInscriptos }
        : act
      )
    );
      toast.success("Actividad actualizada");
    } else {
      const nuevaActividad = {
        ...formData,
        id: Date.now(),
        usuariosInscriptos: 0,
      };
      setActividades((prev) => [...prev, nuevaActividad]);
      toast.success("Actividad creada");
    }
    handleCloseModal();
  };

  const handleEliminar = (id) => {
    setActividades((prev) => prev.filter((act) => act.id !== id));
    toast.info("Actividad eliminada");
  };

  return (
    <div className="container mt-4">
      <h2>Actividades</h2>
      <Button variant="primary" onClick={() => handleShowModal()}>
            Nueva Actividad
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cupo Máximo</th>
            <th>Inscriptos</th>
            <th>Días y Horarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {actividades.map((act) => (
            <tr key={act.id}>
              <td>{act.nombre}</td>
              <td>{act.cupoMaximo}</td>
              <td>{act.usuariosInscriptos}</td>
              <td>{act.diasYhorarios}</td>
              <td>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleShowModal(act)}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleEliminar(act.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para crear/editar */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editando ? "Editar Actividad" : "Nueva Actividad"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cupo Máximo</Form.Label>
              <Form.Control
                type="number"
                name="cupoMaximo"
                value={formData.cupoMaximo}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Días y Horarios</Form.Label>
              <Form.Control
                type="text"
                name="diasYhorarios"
                value={formData.diasYhorarios}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleGuardar}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ActividadesAdmin;
