/**
 * Repositorio JSON — Capa de Acceso a Datos
 *
 * Implementa el Patrón Repositorio para abstraer completamente la persistencia.
 * Toda interacción con el archivo db.json pasa por aquí.
 * Beneficio arquitectónico: si en el futuro se desea conectar MongoDB o PostgreSQL,
 * solo se reemplaza este archivo; el servicio y el controlador no requieren cambios.
 */

const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "db.json");

/**
 * Lee el archivo de base de datos y devuelve su contenido como objeto JS.
 * @returns {Promise<Object>} contenido de la base de datos
 */
const leerBaseDatos = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(DB_PATH, "utf-8", (error, data) => {
      if (error) {
        reject(new Error(`Error al leer la base de datos: ${error.message}`));
        return;
      }
      try {
        resolve(JSON.parse(data));
      } catch (parseError) {
        reject(new Error(`Error al parsear la base de datos: ${parseError.message}`));
      }
    });
  });
};

/**
 * Escribe el objeto recibido en el archivo de base de datos.
 * @param {Object} datos - Datos completos a persistir
 * @returns {Promise<void>}
 */
const escribirBaseDatos = (datos) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(DB_PATH, JSON.stringify(datos, null, 2), "utf-8", (error) => {
      if (error) {
        reject(new Error(`Error al escribir en la base de datos: ${error.message}`));
        return;
      }
      resolve();
    });
  });
};

module.exports = { leerBaseDatos, escribirBaseDatos };
