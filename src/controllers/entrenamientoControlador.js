/**
 * Controlador de Entrenamiento — Capa de Presentación
 *
 * Gestiona la entrada/salida HTTP. No contiene lógica de negocio:
 * delega toda operación al Servicio y traduce resultados a respuestas HTTP.
 * Todos los métodos incluyen manejo de errores con códigos de estado correctos.
 */

const Servicio = require("../services/entrenamientoServicio");

/**
 * GET /api/v1/entrenamientos
 * Devuelve la lista completa de entrenamientos.
 */
const obtenerTodosLosEntrenamientos = async (req, res) => {
  try {
    const entrenamientos = await Servicio.obtenerTodosLosEntrenamientos();
    res.status(200).json({ status: "OK", data: entrenamientos });
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: error.message });
  }
};

/**
 * GET /api/v1/entrenamientos/:entrenamientoId
 * Devuelve un entrenamiento específico por su ID.
 */
const obtenerUnEntrenamiento = async (req, res) => {
  try {
    const { entrenamientoId } = req.params;
    const entrenamiento = await Servicio.obtenerUnEntrenamiento(entrenamientoId);
    if (!entrenamiento) {
      return res.status(404).json({
        status: "NOT_FOUND",
        message: `No existe un entrenamiento con el ID: ${entrenamientoId}`,
      });
    }
    res.status(200).json({ status: "OK", data: entrenamiento });
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: error.message });
  }
};

/**
 * POST /api/v1/entrenamientos
 * Crea un nuevo entrenamiento.
 * Body requerido: { name, items, logisticsInfo }
 */
const crearNuevoEntrenamiento = async (req, res) => {
  try {
    const { name, items, logisticsInfo } = req.body;
    if (!name || !items || !logisticsInfo) {
      return res.status(400).json({
        status: "BAD_REQUEST",
        message: "El cuerpo de la petición debe incluir: name, items y logisticsInfo.",
      });
    }
    const nuevoEntrenamiento = await Servicio.crearNuevoEntrenamiento({
      name,
      items,
      logisticsInfo,
    });
    if (!nuevoEntrenamiento) {
      return res.status(409).json({
        status: "CONFLICT",
        message: `Ya existe un entrenamiento con el nombre: "${name}"`,
      });
    }
    res.status(201).json({ status: "CREATED", data: nuevoEntrenamiento });
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: error.message });
  }
};

/**
 * PATCH /api/v1/entrenamientos/:entrenamientoId
 * Actualiza parcialmente un entrenamiento existente.
 */
const actualizarUnEntrenamiento = async (req, res) => {
  try {
    const { entrenamientoId } = req.params;
    const cambios = req.body;
    if (!cambios || Object.keys(cambios).length === 0) {
      return res.status(400).json({
        status: "BAD_REQUEST",
        message: "El cuerpo de la petición no puede estar vacío.",
      });
    }
    const actualizado = await Servicio.actualizarUnEntrenamiento(entrenamientoId, cambios);
    if (!actualizado) {
      return res.status(404).json({
        status: "NOT_FOUND",
        message: `No existe un entrenamiento con el ID: ${entrenamientoId}`,
      });
    }
    res.status(200).json({ status: "OK", data: actualizado });
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: error.message });
  }
};

/**
 * DELETE /api/v1/entrenamientos/:entrenamientoId
 * Elimina un entrenamiento por su ID.
 */
const eliminarUnEntrenamiento = async (req, res) => {
  try {
    const { entrenamientoId } = req.params;
    const eliminado = await Servicio.eliminarUnEntrenamiento(entrenamientoId);
    if (!eliminado) {
      return res.status(404).json({
        status: "NOT_FOUND",
        message: `No existe un entrenamiento con el ID: ${entrenamientoId}`,
      });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: error.message });
  }
};

module.exports = {
  obtenerTodosLosEntrenamientos,
  obtenerUnEntrenamiento,
  crearNuevoEntrenamiento,
  actualizarUnEntrenamiento,
  eliminarUnEntrenamiento,
};