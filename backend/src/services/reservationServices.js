import { ReservaDeTurno } from "../models/reservation.js";
import { User } from "../models/user.js"; 
import { Actividad } from "../models/activity.js";

// 1. Crear nueva reserva
export const createReserva = async (req, res) => {
  try {
    const { usuarioId, actividadId, fecha, estado } = req.body;

    const reservaExistente = await ReservaDeTurno.findOne({
      where: { usuarioId, actividadId, fecha },
    });

    if (reservaExistente) {
      return res.status(400).json({ message: "Ya tenés una reserva para esta clase" });
    }

    const actividad = await Actividad.findByPk(actividadId);
    if (!actividad || actividad.estado !== "Activo") {
      return res.status(400).json({ message: "Actividad no disponible" });
    }

    const usuario = await Usuario.findByPk(usuarioId);
    if (usuario.estadoCuenta !== "Pagada") {
      return res.status(403).json({ message: "Necesitás tener la cuota al día para reservar" });
    }

    const reservasEnFecha = await ReservaDeTurno.count({
      where: { actividadId, fecha },
    });

    if (reservasEnFecha >= actividad.cupoMaximo) {
      return res.status(400).json({ message: "Cupo completo para esta clase" });
    }

    const nuevaReserva = await ReservaDeTurno.create({
      usuarioId,
      actividadId,
      fecha,
      estado,
    });

    res.status(201).json(nuevaReserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la reserva" });
  }
};

// 2. Obtener todas las reservas (con filtro por rol)
export const getAllReservas = async (req, res) => {
  try {
    const user = req.user;

    if (!user) return res.status(401).json({ message: "No autorizado" });

    let reservas;

    if (user.role === "socio") {
      reservas = await ReservaDeTurno.findAll({ where: { usuarioId: user.id } });
    } else {
      reservas = await ReservaDeTurno.findAll();
    }

    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas" });
  }
};

// 3. Obtener reserva por ID
export const getReservaById = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await ReservaDeTurno.findByPk(id);

    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reserva" });
  }
};

// 4. Actualizar reserva (solo admin/superadmin)
export const updateReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, fecha } = req.body;

    const reserva = await ReservaDeTurno.findByPk(id);
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    reserva.estado = estado || reserva.estado;
    reserva.fecha = fecha || reserva.fecha;

    await reserva.save();

    res.json({ message: "Reserva actualizada", reserva });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar reserva" });
  }
};

// 5. Eliminar reserva (solo superadmin)
export const deleteReserva = async (req, res) => {
  try {
    const { id } = req.params;

    const reserva = await ReservaDeTurno.findByPk(id);
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    await reserva.destroy();

    res.json({ message: "Reserva eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar reserva" });
  }
};


