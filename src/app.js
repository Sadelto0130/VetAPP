import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'
import path from "path";

import registroRoutes from "./routes/registro.routes.js";
import usuarioRoutes from "./routes/auth.routes.js";
import mascotaRoutes from "./routes/pet.routes.js";
import veterinarioRoutes from "./routes/vet.routes.js";
import clinicRoutes from "./routes/clinic.routes.js"
import { pool } from "./db.js";
import { ORIGIN } from "./config.js";
import { fileURLToPath } from "url";

// Necesario para __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta al dist del frontend
const frontendPath = path.join(__dirname, "../frontend/dist");

//Configuracion de express
const app = express();

app.use(cors({
  origin: ORIGIN,
  credentials: true
}))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://vetapp.up.railway.app");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(morgan("dev"));
app.use(cookieParser()); // lee las cookies que se envian desde el frontend
app.use(express.json()); // convierte todo lo que llega en json a javascript
app.use(express.static(frontendPath)); // Servir archivos estáticos desde dist
//app.use(express.urlencoded({ extended: true })); // permite enviar formularios desde el frontend

app.get("/", (req, res) => res.json({ message: "Bienvenidos pagina vet" }));
app.get("/api/ping", async (req, res) => {
  const result = await pool.query('SELECT NOW()')
  return res.json(result.rows[0])
});

app.use("/api", registroRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", mascotaRoutes);
app.use("/api", veterinarioRoutes);
app.use("/api", clinicRoutes);

// ruta para manejos de errores
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "Error",
    message: err.message,
  });
});


// Redirigir todo lo que no sea API a React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

export default app;
