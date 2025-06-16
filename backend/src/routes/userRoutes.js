import { Router } from "express";


// Servicios del usuario - // User Services
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeUserRole
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

router.put("/:id", updateUser);

router.delete("/:id", isSuperAdmin, deleteUser);

router.patch("/:id/rol", isSuperAdmin, changeUserRole);

export default router;

