import express from "express";
import {PORT} from "./config"

const app = express();

app.listen(PORT);
app.use();

console.log(`Server listening on port ${PORT}`);