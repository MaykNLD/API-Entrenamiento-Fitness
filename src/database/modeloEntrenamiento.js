/**
 * Modelo de Entrenamiento
 *
 * Define las operaciones CRUD completas sobre la colección "entrenamientos".
 * Utiliza el Repositorio JSON como única fuente de verdad, manteniendo
 * la separación de responsabilidades entre la lógica de negocio y la persistencia.
 */

const { leerBaseDatos, escribirBaseDatos } = require("./repository");

/**
 * Devuelve todos los entrenamientos almacenados.
 * @returns {Promise<Array>}
 */
const obtenerTodos = async () => {
  const db = await leerBaseDatos();
  return db.entrenamientos;
};

/**
 * Devuelve un entrenamiento por su ID.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
const obtenerPorId = async (id) => {
  const db = await leerBaseDatos();
  return db.entrenamientos.find((e) => e.id === id) || null;
};

/**
 * Crea un nuevo entrenamiento si no existe otro con el mismo nombre.
 * @param {Object} nuevoEntrenamiento
 * @returns {Promise<Object|null>} el entrenamiento creado o null si ya existe
 */
const crear = async (nuevoEntrenamiento) => {
  const db = await leerBaseDatos();
  const yaExiste = db.entrenamientos.some(
    (e) => e.name.toLowerCase() === nuevoEntrenamiento.name.toLowerCase()
  );
  if (yaExiste) return null;
  db.entrenamientos.push(nuevoEntrenamiento);
  await escribirBaseDatos(db);
  return nuevoEntrenamiento;
};

/**
 * Actualiza los campos de un entrenamiento existente.
 * @param {string} id
 * @param {Object} cambios - Campos parciales a actualizar
 * @returns {Promise<Object|null>} el entrenamiento actualizado o null si no existe
 */
const actualizar = async (id, cambios) => {
  const db = await leerBaseDatos();
  const indice = db.entrenamientos.findIndex((e) => e.id === id);
  if (indice === -1) return null;
  db.entrenamientos[indice] = {
    ...db.entrenamientos[indice],
    ...cambios,
    updatedAt: new Date().toISOString(),
  };
  await escribirBaseDatos(db);
  return db.entrenamientos[indice];
};

/**
 * Elimina un entrenamiento por su ID.
 * @param {string} id
 * @returns {Promise<boolean>} true si se eliminó, false si no existía
 */
const eliminar = async (id) => {
  const db = await leerBaseDatos();
  const indice = db.entrenamientos.findIndex((e) => e.id === id);
  if (indice === -1) return false;
  db.entrenamientos.splice(indice, 1);
  await escribirBaseDatos(db);
  return true;
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };