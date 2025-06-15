import { Router } from "express";

// Servicios de autenticación - // Authentication services
import { loginUser, registerUser } from "../services/auth.services.js";

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

// Public routes
router.post("/register", registerUser);   // Membership registration
router.post("/login", loginUser);         // Login

// Rutas protegidas con token - //Token-protected routes

// Ver todos los usuarios (solo Admin o SuperAdmin)
router.get("/", verifyToken, isAdmin, getAllUsers);

// Ver perfil propio o usuario por ID - // View own profile or user by ID
router.get("/:id", verifyToken, getUserById);

// Actualizar perfil - //Update profile
router.put("/:id", verifyToken, updateUser);

// Eliminar usuario (solo SuperAdmin) - // Delete user (SuperAdmin only)
router.delete("/:id", verifyToken, isSuperAdmin, deleteUser);

// Cambiar rol (solo SuperAdmin) - // Change role (SuperAdmin only)
router.patch("/:id/rol", verifyToken, isSuperAdmin, changeUserRole);

export default router;

