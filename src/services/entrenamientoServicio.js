const { v4: uuid } = require("uuid");
const ModeloEntrenamiento = require("../database/modeloEntrenamiento");

const obtenerTodosLosEntrenamientos = () => {
    const todosLosEntrenamientos = ModeloEntrenamiento.obtenerTodosLosEntrenamientos();
    return todosLosLosEntrenamientos;
  };
  
  const obtenerUnEntrenamiento = () => {
    return;
  };
  
  const crearNuevoEntrenamiento = (nuevoEntrenamiento) => {
    const entrenamientoAInsertar = {
        ...nuevoEntrenamiento,
        id: uuid(),
        createdAt: new Date().toLocaleString("es-ES", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("es-ES", { timeZone: "UTC" }),
      };
      const entrenamientoCreado = ModeloEntrenamiento.crearNuevoEntrenamiento(entrenamientoAInsertar);
      return entrenamientoCreado;
  };


  
  const actualizarUnEntrenamiento = () => {
    return;
  };
  
  const eliminarUnEntrenamiento = () => {
    return;
  };
  
  module.exports = {
    obtenerTodosLosEntrenamientos,
    obtenerUnEntrenamiento,
    crearNuevoEntrenamiento,
    actualizarUnEntrenamiento,
    eliminarUnEntrenamiento,
  };