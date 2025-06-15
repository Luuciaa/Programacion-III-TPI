import { Actividad } from "../models/activity";

// Crear nueva actividad
export const createActividad = async (req, res) => {
  try {
    const { nombreClase, estado, diasYhorarios, cupoMaximo } = req.body;

    const nuevaActividad = await Actividad.create({
      nombreClase,
      estado,
      diasYhorarios,
      cupoMaximo,
    });

    res.status(201).json(nuevaActividad);
  } catch (error) {
    res.status(500).json({ message: "Error al crear actividad" });
  }
};

// Obtener todas las actividades
export const getAllActividades = async (req, res) => {
  try {
    const actividades = await Actividad.findAll();
    res.json(actividades);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener actividades" });
  }
};

// Obtener actividad por ID
export const getActividadById = async (req, res) => {
  try {
    const { id } = req.params;
    const actividad = await Actividad.findByPk(id);

    if (!actividad) return res.status(404).json({ message: "Actividad no encontrada" });

    res.json(actividad);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener actividad" });
  }
};

// Actualizar actividad
export const updateActividad = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreClase, estado, diasYhorarios, cupoMaximo } = req.body;

    const actividad = await Actividad.findByPk(id);
    if (!actividad) return res.status(404).json({ message: "Actividad no encontrada" });

    actividad.nombreClase = nombreClase || actividad.nombreClase;
    actividad.estado = estado || actividad.estado;
    actividad.diasYhorarios = diasYhorarios || actividad.diasYhorarios;
    actividad.cupoMaximo = cupoMaximo || actividad.cupoMaximo;

    await actividad.save();

    res.json({ message: "Actividad actualizada", actividad });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar actividad" });
  }
};

// Eliminar actividad
export const deleteActividad = async (req, res) => {
  try {
    const { id } = req.params;
    const actividad = await Actividad.findByPk(id);

    if (!actividad) return res.status(404).json({ message: "Actividad no encontrada" });

    await actividad.destroy();

    res.json({ message: "Actividad eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar actividad" });
  }
};
