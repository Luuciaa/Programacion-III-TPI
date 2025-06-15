import { User } from "../models/user.js";
import { Actividad } from "../models/activity.js";
import { ReservaDeTurno } from "../models/reservation.js";

// Relación Usuario ↔ ReservaDeTurno (1 a muchos)
User.hasMany(ReservaDeTurno, { foreignKey: "usuarioId" });
ReservaDeTurno.belongsTo(User, { foreignKey: "usuarioId" });

// Relación Actividad ↔ ReservaDeTurno (1 a muchos)
Actividad.hasMany(ReservaDeTurno, { foreignKey: "actividadId" });
ReservaDeTurno.belongsTo(Actividad, { foreignKey: "actividadId" });

