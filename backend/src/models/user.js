import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { UserRoles, MetodoPago } from "../enums/enums.js";

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(Object.values(UserRoles)),
      allowNull: false,
      defaultValue: UserRoles.USER,
    },
    estadoCuenta: {
      type: DataTypes.ENUM("Pagada", "Vencida"),
      allowNull: false,
      defaultValue: "Vencida",
    },
    fechaIngreso: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    mesDeAbono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    metodoPago: {
      type: DataTypes.ENUM(Object.values(MetodoPago)),
      allowNull: true,
    },
    historialPagos: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    notificaciones: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);
