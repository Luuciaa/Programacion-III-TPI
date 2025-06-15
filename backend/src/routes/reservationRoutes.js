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

// Socios pueden ver y crear reservas, pero sólo admins pueden borrar
router.get("/", verifyToken, getAllReservas);
router.get("/:id", verifyToken, getReservaById);

router.post("/", verifyToken, createReserva);

router.put("/:id", verifyToken, isAdmin, updateReserva);
router.delete("/:id", verifyToken, isSuperAdmin, deleteReserva);

export default router;
