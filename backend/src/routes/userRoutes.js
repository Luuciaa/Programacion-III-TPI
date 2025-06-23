import { Router } from "express";


// Servicios del usuario (Socio) - // User Services
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeUserRole,
  registrarPago
} from "../services/userServices.js";

// Middleware para proteger rutas
import {
  verifyToken,
  isAdmin,
  isSuperAdmin
} from "../middleware/authMiddleware.js";

const router = Router();


router.use(verifyToken);


router.get("/", isAdmin, getAllUsers);

router.get("/:id", getUserById);

router.post("/:id/registrar-pago", isAdmin, registrarPago);

router.put("/:id", updateUser);

router.delete("/:id", isSuperAdmin, deleteUser);

router.patch("/:id/rol", isSuperAdmin, changeUserRole);

export default router;

