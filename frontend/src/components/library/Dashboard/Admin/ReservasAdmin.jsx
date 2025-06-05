import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ReservasAdmin = () => {
  const [reservas, setReservas] = useState([]);
  const [filtros, setFiltros] = useState({
    fecha: "",
    actividadId: "",
    estado: "",
  });

  useEffect(() => {
    const reservas = [
      {
        id: 1,
        socio: "Juan",
        fecha: "2025-05-20",
        actividadId: "Zumba",
        estado: "Pendiente",
      },
      {
        id: 2,
        socio: "Ana",
        fecha: "2025-05-21",
        actividadId: "Funcional",
        estado: "Asistió",
      },
      {
        id: 3,
        socio: "Luis",
        fecha: "2025-05-22",
        actividadId: "Cardio",
        estado: "Faltó",
      },
    ];
    setReservas(reservas);
  }, []);

  const toggleAsistencia = (id) => {
    setReservas((prev) =>
      prev.map((reserva) =>
        reserva.id === id
          ? {
              ...reserva,
              estado: reserva.estado === "Asistió" ? "Faltó" : "Asistió",
            }
          : reserva
      )
    );

    const reservaActual = reservas.find((r) => r.id === id);
    const nuevoEstado = reservaActual.estado === "Asistió" ? "Faltó" : "Asistió";
    toast.success(`Se marcó como "${nuevoEstado}"`);
  };

  const handleEliminar = (id) => {
    setReservas((prev) => prev.filter((r) => r.id !== id));
    toast.info("Reserva eliminada");
  };

  const reservasFiltradas = reservas.filter((reserva) => {
    return (
      (filtros.fecha === "" || reserva.fecha === filtros.fecha) &&
      (filtros.actividadId === "" ||
        reserva.actividadId === filtros.actividadId) &&
      (filtros.estado === "" || reserva.estado === filtros.estado)
    );
  });

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Reservas Admin</h3>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <label htmlFor="fecha" className="form-label">Fecha</label>
          <input
            id="fecha"
            type="date"
            className="form-control"
            value={filtros.fecha}
            onChange={(e) => setFiltros({ ...filtros, fecha: e.target.value })}
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="actividad" className="form-label">Actividad</label>
          <select
            id="actividad"
            className="form-select"
            value={filtros.actividadId}
            onChange={(e) =>
              setFiltros({ ...filtros, actividadId: e.target.value })
            }
          >
            <option value="">Todas</option>
            <option value="Zumba">Zumba</option>
            <option value="Cardio">Cardio</option>
            <option value="Funcional">Funcional</option>
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="estado" className="form-label">Estado</label>
          <select
            id="estado"
            className="form-select"
            value={filtros.estado}
            onChange={(e) =>
              setFiltros({ ...filtros, estado: e.target.value })
            }
          >
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Asistió">Asistió</option>
            <option value="Faltó">Faltó</option>
          </select>
        </div>
      </div>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Socio</th>
            <th>Fecha</th>
            <th>Actividad</th>
            <th>Estado</th>
            <th>Marcar Asistencia</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {reservasFiltradas.length > 0 ? (
            reservasFiltradas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.socio}</td>
                <td>{reserva.fecha}</td>
                <td>{reserva.actividadId}</td>
                <td>{reserva.estado}</td>
                <td>
                  <button
                    className={`btn ${
                      reserva.estado === "Asistió"
                        ? "btn-success"
                        : "btn-outline-secondary"
                    } btn-sm`}
                    onClick={() => toggleAsistencia(reserva.id)}
                  >
                    {reserva.estado === "Asistió"
                      ? "Marcar Faltó"
                      : "Marcar Asistió"}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminar(reserva.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No hay reservas que coincidan con los filtros.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservasAdmin;
