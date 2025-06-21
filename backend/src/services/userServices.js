import { User } from "../models/user.js";

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

// Crear nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validaciones mínimas
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const nuevoUsuario = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json(nuevoUsuario); 
  } catch (error) {
    res.status(400).json({ message: "Error al crear el usuario", error: error.message });
  }
};

// Actualizar usuario por ID
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const { name, email, estadoCuenta, mesDeAbono, metodoPago } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (estadoCuenta) user.estadoCuenta = estadoCuenta;
    if (mesDeAbono) user.mesDeAbono = mesDeAbono;
    if (metodoPago) user.metodoPago = metodoPago;

    await user.save();
    res.json({ message: "Usuario actualizado", user });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

// Eliminar usuario por ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.destroy();
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};

// Cambiar rol de usuario
export const changeUserRole = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const { role } = req.body;
    if (!role) return res.status(400).json({ message: "Debe enviar el rol" });

    user.role = role;
    await user.save();
    res.json({ message: "Rol actualizado", user });
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar rol" });
  }
};
