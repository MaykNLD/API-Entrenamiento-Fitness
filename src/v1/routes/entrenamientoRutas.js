const express = require("express");
const entrenamientoControlador = require("../../controllers/entrenamientoControlador");

const router = express.Router();

router.get("/", entrenamientoControlador.obtenerTodosLosEntrenamientos);

router.get("/:entrenamientoId", entrenamientoControlador.obtenerUnEntrenamiento);

router.post("/", entrenamientoControlador.crearNuevoEntrenamiento);

router.patch("/:entrenamientoId", entrenamientoControlador.actualizarUnEntrenamiento);

router.delete("/:entrenamientoId", entrenamientoControlador.eliminarUnEntrenamiento);

module.exports = router;