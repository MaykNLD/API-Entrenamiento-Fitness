const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const obtenerTodosLosEntrenamientos = () => {
  return DB.orderns;
};

const crearNuevoEntrenamiento = (nuevoEntrenamiento) => {
    const yaExiste =
      DB.orderns.findIndex((entrenamiento) => entrenamiento.name === nuevoEntrenamiento.name) > -1;
    if (yaExiste) {
      return;
    }
    DB.orderns.push(nuevoEntrenamiento);
    saveToDatabase(DB);
    return nuevoEntrenamiento;
  };

module.exports = { obtenerTodosLosEntrenamientos, crearNuevoEntrenamiento};