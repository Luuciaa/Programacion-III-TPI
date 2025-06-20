import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Actividad = sequelize.define(
  "actividad",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreClase: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("Activo", "Inactivo"),
      allowNull: false,
      defaultValue: "Activo",
    },
    diasYhorarios: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cupoMaximo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "actividades",
    timestamps: false,
  }
);
