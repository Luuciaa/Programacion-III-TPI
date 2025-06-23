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

// Middleware para permitir socios, admins y superadmins
const allowSocioAdminSuper = (req, res, next) => {
  const role = req.user.role;
  if (role === "socio" || role === "admin" || role === "superadmin") {
    return next();
  }
  return res.status(403).json({ message: "No autorizado" });
};

router.get("/", allowSocioAdminSuper, getAllReservas);
router.get("/:id", allowSocioAdminSuper, getReservaById);
router.post("/", allowSocioAdminSuper, createReserva);

router.put("/:id", isAdmin, updateReserva);
router.delete("/:id", isSuperAdmin, deleteReserva);

export default router;

