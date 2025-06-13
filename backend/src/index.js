import express from "express";
import {PORT} from "./config";
import {Sequelize} from "./db";

import userRoutes from "./routes/userRoutes";
import activityRoutes from "./routes/activityRoutes";
import reservationRoutes from "./routes/reservationRoutes";


const app = express();

app.listen(PORT);
app.use();

console.log(`Server listening on port ${PORT}`);