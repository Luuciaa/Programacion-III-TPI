import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { EstadoReserva } from "../enums/enums.js";

export const ReservaDeTurno = sequelize.define(
  "reserva_de_turno",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    actividadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY, // Día puntual de la clase (ej: 2025-06-15)
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM(...Object.values(EstadoReserva)),
      allowNull: false,
      defaultValue: EstadoReserva.RESERVADA,
    },
  },
  {
    timestamps: false,
  }
);
