import { Router } from "express";
import {
  createReserva,
  getAllReservas,
  getReservaById,
  updateReserva,
  deleteReserva,
} from "../services/reservationServices.js";

import { verifyToken, isAdmin, isSuperAdmin } from "../middleware/authMiddleware.js";

const router = Router();


router.use(verifyToken);

// Socios pueden ver y crear reservas
router.get("/", getAllReservas);
router.get("/:id", getReservaById);
router.post("/", createReserva);

// Solo admins pueden modificar reservas
router.put("/:id", isAdmin, updateReserva);

// Solo superadmins pueden borrar reservas
router.delete("/:id", isSuperAdmin, deleteReserva);

export default router;
