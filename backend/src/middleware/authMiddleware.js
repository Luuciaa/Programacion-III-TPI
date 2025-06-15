import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

// Middleware: Verifica que el token sea válido
export const verifyToken = (req, res, next) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "No posee autorización requerida" });

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload; // Guarda datos útiles (id, rol, email)
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

// Middleware: Solo Admin o SuperAdmin
export const isAdmin = (req, res, next) => {
  const { rol } = req.user;
  if (rol === "admin" || rol === "superadmin") return next();
  return res
    .status(403)
    .json({ message: "Acceso restringido a administradores" });
};

// Middleware: Solo SuperAdmin
export const isSuperAdmin = (req, res, next) => {
  const { rol } = req.user;
  if (rol === "superadmin") return next();
  return res
    .status(403)
    .json({ message: "Acceso solo para super administradores" });
};
