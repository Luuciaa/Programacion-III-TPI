// Importaciones necesarias
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";


import { validateRegisterUser, validateLoginUser } from "../helpers/validations.js";

const SECRET_KEY = process.env.SECRET_KEY;

// Registro de usuario (por defecto como socio)
export const registerUser = async (req, res) => {
  // Validar datos con la función importada
  const result = validateRegisterUser(req.body);
  if (result.error) return res.status(400).send({ message: result.message });

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) return res.status(400).send({ message: "Este email ya se encuentra registrado." });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    rol: "socio",
    estadoCuenta: "Vencida",
    fechaIngreso: new Date(),
    mesDeAbono: null,
    metodoPago: null,
    historialPagos: [],
    notificaciones: []
  });

  res.status(201).json({ id: newUser.id });
};

// Login y generación de token
export const loginUser = async (req, res) => {
  // Validar datos con la función importada
  const result = validateLoginUser(req.body);
  if (result.error) return res.status(400).send({ message: result.message });

  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(401).send({ message: "Usuario no existente" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).send({ message: "Email y/o contraseña incorrecta" });

  const token = jwt.sign(
    { id: user.id, email: user.email, rol: user.rol },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.json({ token });
};


