/**
 * Punto de entrada de la API
 *
 * Inicializa Express con los middlewares de seguridad estándar:
 * - dotenv: carga variables de entorno desde .env
 * - helmet: securiza cabeceras HTTP automáticamente
 * - cors: permite peticiones desde distintos orígenes (configurable)
 * - express.json(): parsea el body de las peticiones en formato JSON
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const rutasEntrenamientoV1 = require("./v1/routes/entrenamientoRutas");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de seguridad
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rutas versionadas
app.use("/api/v1/entrenamientos", rutasEntrenamientoV1);

// Ruta raíz - verificación de estado del servidor
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API de Entrenamiento Fitness — v1.0.0",
    docs: "/api/v1/entrenamientos",
  });
});

// Middleware de ruta no encontrada (404 global)
app.use((req, res) => {
  res.status(404).json({
    status: "NOT_FOUND",
    message: `La ruta ${req.originalUrl} no existe en esta API.`,
  });
});

app.listen(PORT, () => {
  console.log(`✅  API de Entrenamiento Fitness arrancada en http://localhost:${PORT}`);
  console.log(`📋  Endpoint principal: http://localhost:${PORT}/api/v1/entrenamientos`);
});