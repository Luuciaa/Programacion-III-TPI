import { Actividad } from "../models/activity.js";

// Crear nueva actividad
export const createActividad = async (req, res) => {
  try {
    const { nombreClase, estado, diasYHorarios, cupoMaximo } = req.body;

    // Validar campos obligatorios
    if (!nombreClase || !estado || !diasYHorarios || !cupoMaximo) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const nuevaActividad = await Actividad.create({
      nombreClase,
      estado,
      diasYHorarios,
      cupoMaximo,
    });

    res.status(201).json(nuevaActividad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear actividad" });
  }
};

// Obtener todas las actividades con filtro opcional por día y hora
export const getAllActividades = async (req, res) => {
  const { dia, hora } = req.query;

  try {
    let actividades = await Actividad.findAll();

    if (dia || hora) {
      actividades = actividades.filter((actividad) =>
        (!dia || actividad.diasYHorarios.includes(dia)) &&
        (!hora || actividad.diasYHorarios.includes(hora))
      );
    }

    res.json(actividades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener actividades" });
  }
};

// Obtener actividad por ID
export const getActividadById = async (req, res) => {
  try {
    const { id } = req.params;
    const actividad = await Actividad.findByPk(id);

    if (!actividad) {
      return res.status(404).json({ message: "Actividad no encontrada" });
    }

    res.json(actividad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener actividad" });
  }
};

// Actualizar actividad
export const updateActividad = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreClase, estado, diasYHorarios, cupoMaximo } = req.body;

    const actividad = await Actividad.findByPk(id);

    if (!actividad) {
      return res.status(404).json({ message: "Actividad no encontrada" });
    }

    actividad.nombreClase = nombreClase || actividad.nombreClase;
    actividad.estado = estado || actividad.estado;
    actividad.diasYHorarios = diasYHorarios || actividad.diasYHorarios;
    actividad.cupoMaximo = cupoMaximo || actividad.cupoMaximo;

    await actividad.save();

    res.json({ message: "Actividad actualizada", actividad });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar actividad" });
  }
};

// Eliminar actividad
export const deleteActividad = async (req, res) => {
  try {
    const { id } = req.params;
    const actividad = await Actividad.findByPk(id);

    if (!actividad) {
      return res.status(404).json({ message: "Actividad no encontrada" });
    }

    await actividad.destroy();

    res.json({ message: "Actividad eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar actividad" });
  }
};

