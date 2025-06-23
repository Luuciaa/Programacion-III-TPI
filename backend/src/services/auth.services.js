import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { validateRegisterUser, validateLoginUser } from "../helpers/validations.js";

// Clave secreta con fallback para evitar errores
const SECRET_KEY = process.env.SECRET_KEY ||  "clave_por_defecto_123";

export const registerUser = async (req, res) => {
  console.log("📩 Entró a registerUser");
  try {
    console.log("🧾 Datos recibidos:", req.body);

    const result = validateRegisterUser(req.body);
    if (result.error) {
      console.log("❌ Falló la validación:", result.message);
      return res.status(400).json({ message: result.message });
    }

    const { name, email, password } = req.body;

    console.log("🔍 Buscando usuario existente...");
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      console.log("⚠️ Email ya registrado:", email);
      return res.status(400).json({ message: "Este email ya se encuentra registrado." });
    }

    console.log("🔐 Hasheando contraseña...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("✅ Contraseña hasheada:", hashedPassword);

    console.log("🚧 Intentando crear usuario en la base de datos...");
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

    console.log("✅ Usuario creado:", newUser.email);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    console.log("🎫 Token generado");
    res.status(201).json({ id: newUser.id, token });

  } catch (error) {
    console.error("❌ ERROR al registrar usuario:", error.message);
    console.error("📌 Stack:", error.stack);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    console.log("Datos recibidos para login:", req.body);

    // Validar datos de entrada (email y password)
    const result = validateLoginUser(req.body);
    if (result.error) {
      console.log("Error en validación de login:", result.message);
      return res.status(400).json({ message: result.message });
    }

    const { email, password } = req.body;
    console.log("Buscando usuario con email:", email);

    // Buscar usuario en la base de datos
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("Usuario no encontrado con email:", email);
      return res.status(401).json({ message: "Usuario no existente" });
    }

    // Comparar password recibido con el hash guardado
    const isValid = await bcrypt.compare(password, user.password);
    console.log("Resultado de comparación de contraseña:", isValid);

    if (!isValid) {
      console.log("Contraseña incorrecta para email:", email);
      return res.status(401).json({ message: "Email y/o contraseña incorrecta" });
    }

    // Verificar que la clave secreta esté definida
    if (!SECRET_KEY) {
      console.log("SECRET_KEY no está definida");
      return res.status(500).json({ message: "Error de configuración de seguridad" });
    }

    // Generar token JWT con id, email y rol del usuario
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    console.log("Login exitoso. Token generado:", token);

    // Enviar token y id al frontend
    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });


  } catch (error) {
    console.error("Error interno en loginUser:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};



