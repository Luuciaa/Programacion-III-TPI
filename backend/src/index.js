import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors"; 

import { PORT } from "./config.js";
import { sequelize } from "./db.js";

import userRoutes from "./routes/userRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import "./models/user.js";
import "./models/activity.js";
import "./models/reservation.js";
import "./models/associations.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Función async para iniciar el servidor
const startServer = async () => {
  try {
    // Sincronizar base de datos
    await sequelize.sync();

    // Registrar rutas
    app.use("/api/usuarios", userRoutes);
    app.use("/api/actividades", activityRoutes);
    app.use("/api/reservas", reservationRoutes);
    app.use("/api/auth", authRoutes);

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Ocurrió un error en la inicialización:", error);
  }
};

// Ejecutar función para arrancar todo
startServer();


