import React from "react";
import { Table, Button, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getColorCuota } from "../../../../utils/helpersAdmin";

const usuarios = [
  { id: 1, socio: "Juan", email: "juan@gmail.com", estadoCuota: "al-dia" },
  { id: 2, socio: "Ana", email: "ana@gmail.com", estadoCuota: "vencido" },
];

const UsuariosAdmin = () => {

  const handleEditar = (id) => {
    toast.info(`Editar usuario ${id}`, { position: "top-right" });
  };

  const handleEliminar = (id) => {
    toast.error(`Eliminar usuario ${id}`, { position: "top-right" });
  };

  const handleRegistrarPago = (id) => {
    toast.success(`Pago registrado para el usuario ${id}`, { position: "top-right" });
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
          {usuarios.map(({ id, socio, email, estadoCuota }) => (
            <tr key={id}>
              <td>{socio}</td>
              <td>{email}</td>
              <td>
                <Badge bg={getColorCuota(estadoCuota)}>
                  {estadoCuota === "al-dia" ? "Al día" : "Vencido"}
                </Badge>
              </td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleEditar(id)} className="me-2">
                  Editar
                </Button>
                <Button variant="warning" size="sm" onClick={() => handleRegistrarPago(id)} className="me-2">
                  Registrar Pago
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleEliminar(id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsuariosAdmin;
