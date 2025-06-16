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

    const { rol } = req.body;
    if (!rol) return res.status(400).json({ message: "Debe enviar el rol" });

    user.rol = rol;
    await user.save();
    res.json({ message: "Rol actualizado", user });
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar rol" });
  }
};
