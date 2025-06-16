import { ReservaDeTurno } from "../models/reservation.js";

// Crear nueva reserva
export const createReserva = async (req, res) => {
  try {
    const { usuarioId, actividadId, fecha, estado } = req.body;

    const nuevaReserva = await ReservaDeTurno.create({
      usuarioId,
      actividadId,
      fecha,
      estado,
    });

    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(500).json({ message: "Error al crear reserva" });
  }
};

// Obtener todas las reservas
export const getAllReservas = async (req, res) => {
  try {
    const reservas = await ReservaDeTurno.findAll();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas" });
  }
};

// Obtener reserva por ID
export const getReservaById = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await ReservaDeTurno.findByPk(id);

    if (!reserva)
      return res.status(404).json({ message: "Reserva no encontrada" });

    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reserva" });
  }
};

// Actualizar reserva
export const updateReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, fecha } = req.body;

    const reserva = await ReservaDeTurno.findByPk(id);
    if (!reserva)
      return res.status(404).json({ message: "Reserva no encontrada" });

    reserva.estado = estado || reserva.estado;
    reserva.fecha = fecha || reserva.fecha;

    await reserva.save();

    res.json({ message: "Reserva actualizada", reserva });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar reserva" });
  }
};

// Eliminar reserva
export const deleteReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await ReservaDeTurno.findByPk(id);

    if (!reserva)
      return res.status(404).json({ message: "Reserva no encontrada" });

    await reserva.destroy();

    res.json({ message: "Reserva eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar reserva" });
  }
};
