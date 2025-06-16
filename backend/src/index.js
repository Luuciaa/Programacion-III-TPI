import express from "express";
import dotenv from "dotenv";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";

import userRoutes from "./routes/userRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";

import "./models/user.js";
import "./models/activity.js";
import "./models/reservation.js";
import "./models/associations.js";

dotenv.config();

const app = express();

try {
  // Middlewares
  app.use(express.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });

  // Rutas
  app.use("/api/usuarios", userRoutes);
  app.use("/api/actividades", activityRoutes);
  app.use("/api/reservas", reservationRoutes);

  // Sincronizar base de datos
  await sequelize.sync();

  // Iniciar servidor
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
} catch (error) {
  console.error("Ocurrió un error en la inicialización:", error);
}
