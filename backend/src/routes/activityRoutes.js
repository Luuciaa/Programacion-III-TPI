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


router.use(verifyToken);

// Rutas accesibles para cualquier usuario autenticado
router.get("/", getAllActividades);
router.get("/:id", getActividadById);

// Rutas que requieren rol Admin o SuperAdmin
router.post("/", isAdmin, createActividad);
router.put("/:id", isAdmin, updateActividad);
router.delete("/:id", isSuperAdmin, deleteActividad);



export default router;
