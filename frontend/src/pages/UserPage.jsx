import React, { useContext, useEffect, useState } from "react";
import DashboardUser from "../components/library/Dashboard/Usuario/DashboardUser";
import AuthContext from "../context/AuthContext/AuthContext";

const UserPage = () => {
  const { user } = useContext(AuthContext);
  const [actividadesHoy, setActividadesHoy] = useState([]);
  const [proximaReserva, setProximaReserva] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("User:", user);
  console.log("Loading:", loading);
  console.log("Actividades hoy:", actividadesHoy);
  console.log("Próxima reserva:", proximaReserva);
  console.log("User en contexto:", user);
  console.log("Token en localStorage:", localStorage.getItem("token"));
  useEffect(() => {
  if (!user) return;

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Traer todas las actividades y reservas
      const [actividadesRes, reservasRes] = await Promise.all([
        fetch("http://localhost:3000/api/actividades", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch("http://localhost:3000/api/reservas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (!actividadesRes.ok || !reservasRes.ok) {
        throw new Error("Error al cargar datos desde la API");
      }

      const actividadesData = await actividadesRes.json();
      const reservasData = await reservasRes.json();

      // Filtrar actividades de hoy
      const diaDeHoy = new Date()
        .toLocaleDateString("es-AR", { weekday: "long" })
        .toLowerCase();

      const actividadesHoy = actividadesData.filter((actividad) =>
        actividad.diasYHorarios?.some((d) => d.dia.toLowerCase() === diaDeHoy)
      );

      // Filtrar próxima reserva del usuario
      const reservasDelUsuario = reservasData
        .filter((r) => r.usuarioId === user.id)
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

      const proximaReserva = reservasDelUsuario.length
        ? reservasDelUsuario[0]
        : null;

      setActividadesHoy(actividadesHoy);
      setProximaReserva(proximaReserva);
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [user]);

  if (loading) return <p>Cargando datos...</p>;
  if (!user) return <p>No hay usuario logueado</p>;

  return (
    <div className="p-3">
      <DashboardUser
        usuario={user}
        actividadesHoy={actividadesHoy}
        proximaReserva={proximaReserva}
      />
    </div>
  );
};

export default UserPage;


