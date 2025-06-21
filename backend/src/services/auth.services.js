import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { validateRegisterUser, validateLoginUser } from "../helpers/validations.js";

const SECRET_KEY = process.env.SECRET_KEY;

export const registerUser = async (req, res) => {
  try {
    const result = validateRegisterUser(req.body);
    if (result.error) 
      return res.status(400).json({ message: result.message });

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) 
      return res.status(400).json({ message: "Este email ya se encuentra registrado." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "socio",
      estadoCuenta: "Vencida",
      fechaIngreso: new Date(),
      mesDeAbono: null,
      metodoPago: null,
      historialPagos: [],
      notificaciones: []
    });

    // Generar token al registrar
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Devolver token junto con el id
    res.status(201).json({ id: newUser.id, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


export const loginUser = async (req, res) => {
  try {
    const result = validateLoginUser(req.body);
    if (result.error) 
      return res.status(400).json({ message: result.message });

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) 
      return res.status(401).json({ message: "Usuario no existente" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) 
      return res.status(401).json({ message: "Email y/o contraseña incorrecta" });

    if (!SECRET_KEY) 
      return res.status(500).json({ message: "Error de configuración de seguridad" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // También devolvés el id
    res.json({ token, id: user.id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};




