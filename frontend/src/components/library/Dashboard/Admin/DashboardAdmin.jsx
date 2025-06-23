import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { getColorCuota } from "../../../../utils/helpersAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

const DashboardAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar usuarios");
        return res.json();
      })
      .then((data) => setUsuarios(data))
      .catch(() => toast.error("No se pudieron cargar los usuarios"));
  }, []);

  return (
    <div className="container-fluid mt-4">
      <h3 className="text-center mb-4">Panel de Administración</h3>
      <div className="row">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
            <Card bg={getColorCuota(usuario.estadoCuenta)} text="white" className="text-center">
              <Card.Body>
                <div className="mb-2">
                  <i className="bi bi-person-circle fs-2"></i>
                </div>
                <h6>{usuario.name}</h6>
                <p className="mb-0">
                  {usuario.estadoCuenta === "Pagada" ? "Cuota al día" : "Cuota vencida"}
                </p>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAdmin;
