import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const ActividadesAdmin = () => {
  const [actividades, setActividades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    nombre: "",
    cupoMaximo: "",
    diasYhorarios: "",
  });

  // 1. Traer actividades al montar
  useEffect(() => {
    fetch("http://localhost:3000/api/actividades")
      .then(res => res.json())
      .then(data => setActividades(data))
      .catch(() => toast.error("No se pudieron cargar las actividades"));
  }, []);

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

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 2. Guardar o editar con backend
  const handleGuardar = () => {
    if (!formData.nombre || !formData.cupoMaximo || !formData.diasYhorarios) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    const cupo = Number(formData.cupoMaximo);
    if (isNaN(cupo) || cupo <= 0) {
      toast.error("El cupo máximo debe ser un número mayor a 0");
      return;
    }

    const metodo = editando ? "PUT" : "POST";
    const url = editando
      ? `http://localhost:3000/api/actividades/${formData.id}`
      : "http://localhost:3000/api/actividades";

    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error("Error en la operación");
        return res.json();
      })
      .then((actividadGuardada) => {
        if (editando) {
          setActividades(prev =>
            prev.map(act => (act.id === actividadGuardada.id ? actividadGuardada : act))
          );
          toast.success("Actividad actualizada");
        } else {
          setActividades(prev => [...prev, actividadGuardada]);
          toast.success("Actividad creada");
        }
        handleCloseModal();
      })
      .catch(() => toast.error("Error al guardar actividad"));
  };

  // 3. Eliminar con backend
  const handleEliminar = (id) => {
    fetch(`http://localhost:3000/api/actividades/${id}`, {
      method: "DELETE",
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al eliminar");
        setActividades(prev => prev.filter(act => act.id !== id));
        toast.info("Actividad eliminada");
      })
      .catch(() => toast.error("Error al eliminar actividad"));
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
            <th>Días y Horarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {actividades.map((act) => (
            <tr key={act.id}>
              <td>{act.nombre}</td>
              <td>{act.cupoMaximo}</td>
              <td>{act.diasYhorarios}</td>
              <td>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleShowModal(act)}
                >
                  Editar
                </Button>{" "}
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
          <Modal.Title>{editando ? "Editar Actividad" : "Nueva Actividad"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cupo Máximo</Form.Label>
              <Form.Control
                type="number"
                name="cupoMaximo"
                value={formData.cupoMaximo}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
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

