/**
 * Servicio de Entrenamiento — Capa de Lógica de Negocio
 *
 * Actúa como intermediario entre el Controlador y el Modelo.
 * Contiene las reglas de negocio: validaciones, transformaciones y construcción
 * de los objetos antes de persistirlos.
 */

const { v4: uuid } = require("uuid");
const Modelo = require("../database/modeloEntrenamiento");

/**
 * Obtiene todos los entrenamientos disponibles.
 * @returns {Promise<Array>}
 */
const obtenerTodosLosEntrenamientos = async () => {
  return await Modelo.obtenerTodos();
};

/**
 * Obtiene un entrenamiento por su ID.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
const obtenerUnEntrenamiento = async (id) => {
  return await Modelo.obtenerPorId(id);
};

/**
 * Crea un nuevo entrenamiento con metadatos generados automáticamente.
 * @param {Object} datos - { name, items, logisticsInfo }
 * @returns {Promise<Object|null>} entrenamiento creado o null si ya existe
 */
const crearNuevoEntrenamiento = async ({ name, items, logisticsInfo }) => {
  const nuevoEntrenamiento = {
    id: uuid(),
    name,
    items,
    logisticsInfo,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return await Modelo.crear(nuevoEntrenamiento);
};

/**
 * Actualiza los campos de un entrenamiento existente.
 * Solo actualiza los campos recibidos (actualización parcial).
 * @param {string} id
 * @param {Object} cambios
 * @returns {Promise<Object|null>} entrenamiento actualizado o null si no existe
 */
const actualizarUnEntrenamiento = async (id, cambios) => {
  return await Modelo.actualizar(id, cambios);
};

/**
 * Elimina un entrenamiento por su ID.
 * @param {string} id
 * @returns {Promise<boolean>}
 */
const eliminarUnEntrenamiento = async (id) => {
  return await Modelo.eliminar(id);
};

module.exports = {
  obtenerTodosLosEntrenamientos,
  obtenerUnEntrenamiento,
  crearNuevoEntrenamiento,
  actualizarUnEntrenamiento,
  eliminarUnEntrenamiento,
};