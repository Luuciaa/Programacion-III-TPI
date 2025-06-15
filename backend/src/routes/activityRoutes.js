import { Router } from "express";
import {
  createActividad,
  getAllActividades,
  getActividadById,
  updateActividad,
  deleteActividad,
} from "../services/activityServices.js";

import { verifyToken, isAdmin, isSuperAdmin } from "../middleware/authMiddleware.js";

const router = Router();

// Rutas públicas o protegidas según tu lógica
router.get("/", verifyToken, getAllActividades);
router.get("/:id", verifyToken, getActividadById);

// Solo Admin o SuperAdmin pueden modificar actividades
router.post("/", verifyToken, isAdmin, createActividad);
router.put("/:id", verifyToken, isAdmin, updateActividad);
router.delete("/:id", verifyToken, isSuperAdmin, deleteActividad);

export default router;
