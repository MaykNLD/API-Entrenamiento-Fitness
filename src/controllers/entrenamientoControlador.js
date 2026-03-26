const entrenamientoServicio = require("../services/entrenamientoServicio");

const obtenerTodosLosEntrenamientos = (req, res) => {
    const todosLosEntrenamientos = entrenamientoServicio.obtenerTodosLosEntrenamientos();
    res.send({ status: "OK", data: todosLosEntrenamientos });
  };
  
  const obtenerUnEntrenamiento = (req, res) => {
    const entrenamiento = entrenamientoServicio.obtenerUnEntrenamiento();
    res.send("Obtener un entrenamiento existente");
  };
  
  const crearNuevoEntrenamiento = (req, res) => {
    const { body } = req;
    if (
      !body.name ||
      !body.items ||
      !body.logisticsInfo 
    ) {
      return;
    }
    const nuevoEntrenamiento = {
      name: body.name,
      items: body.items,
      logisticsInfo: body.logisticsInfo,
    };
    const entrenamientoCreado = entrenamientoServicio.crearNuevoEntrenamiento(nuevoEntrenamiento);
    res.status(201).send({ status: "OK", data: entrenamientoCreado });
  };
  
  const actualizarUnEntrenamiento = (req, res) => {
    const entrenamientoActualizado = entrenamientoServicio.actualizarUnEntrenamiento();
    res.send("Actualizar un entrenamiento existente");
  };
  
  const eliminarUnEntrenamiento = (req, res) => {
    entrenamientoServicio.eliminarUnEntrenamiento();
    res.send("Eliminar un entrenamiento existente");
  };
  
  module.exports = {
    obtenerTodosLosEntrenamientos,
    obtenerUnEntrenamiento,
    crearNuevoEntrenamiento,
    actualizarUnEntrenamiento,
    eliminarUnEntrenamiento,
  };