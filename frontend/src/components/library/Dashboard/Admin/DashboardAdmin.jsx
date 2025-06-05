import React from "react";
import { Card, CardBody } from "react-bootstrap";
import { getColorCuota } from "./utils/helpersAdmin";
import "bootstrap/dist/css/bootstrap.min.css";

const usuarios = [
  { id: 1, socio: "Juan", estadoCuota: "al-dia" },
  { id: 2, socio: "Ana", estadoCuota: "vencido" },
  { id: 3, socio: "Carlos", estadoCuota: "al-dia" },
  { id: 4, socio: "Lucía", estadoCuota: "vencido" },
  { id: 5, socio: "Pedro", estadoCuota: "al-dia" },
  { id: 6, socio: "Laura", estadoCuota: "al-dia" },
];

const DashboardAdmin = () => {
  return (
    <div className="container-fluid mt-4">
      <h3 className="text-center mb-4">
        Panel de Administración
      </h3>
      <div className="row">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4"
          >
            <Card
              bg={getColorCuota(usuario.estadoCuota)}
              text="white"
              className="text-center"
            >
              <CardBody>
                <div className="mb-2">
                  <i className="bi bi-person-circle fs-2"></i>
                </div>
                <h6>{usuario.socio}</h6>
                <p className="mb-0">
                  {usuario.estadoCuota === "al-dia"
                    ? "Cuota al día"
                    : "Cuota vencida"}
                </p>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAdmin;
