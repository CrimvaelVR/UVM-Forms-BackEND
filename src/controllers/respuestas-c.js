// respuestasController.js (controlador de respuestas)

const respuestas = require('../models/respuestas');

class RespuestasController {
    crearRespuesta = async (req, res) => {
        try {
          const {id_encuesta, id_usuario, respuesta} = req.body;
          const nuevaRespuesta = new respuestas({id_encuesta, id_usuario, respuesta});
          await nuevaRespuesta.save();
          res.status(201).json({mensaje: 'Respuesta agreagada correctamente', respuesta: nuevaRespuesta});
        } catch (error) {
          res.status(500).json({mensaje: 'Error al registrar respuesta', error});
        }
      };

    obtenerRespuesta = async (req, res) => {
        try {
          const respuesta = await respuestas.find();
          respuesta.length 
          ?
            res.status(200).json({mensaje: 'Respuestas encontradas correctamente', respuesta})
          :
            res.status(404).json({mensaje: 'No hay respuestas en la base de datos', respuesta})
        } catch (error) {
          res.status(500).json({mensaje: 'Error al obtener las respuestas de la encuenta', error});
        }
    };
      
      // Función para obtener una respuesta por su id de encuesta
    obtenerRepuestaPorId = async (req, res) => {
        try {
          const id_encuesta = req.params.id_encuesta;
          const respuesta = await respuestas.findById(id_encuesta);
          if (!respuesta) {
            return res.status(404).json({mensaje: 'Respuesta no encontrada de la encuesta'});
          }
          res.status(200).json({mensaje: 'Respuesta encontrada correctamente', respuesta});
        } catch (error) {
          res.status(500).json({mensaje: 'Error al obtener la respuesta', error});
        }
      };
      
      // Función para actualizar uns respuesta por su id
    actualizarRespuestaPorId = async (req, res) => {
        try {
          const id = req.params.id;
          const{id_encuesta, id_usuario, respuesta} = req.body;
          const respuestaActualizada = await respuestas.findByIdAndUpdate(id, {id_encuesta, id_usuario, respuesta}, {new: true});
          if (!respuestaActualizada) {
            return res.status(404).json({mensaje: 'Respuesta no encontrada'});
          }
          res.status(200).json({mensaje: 'Respuesta actualizada correctamente', respuesta: respuestaActualizada});
        } catch (error) {
          res.status(500).json({mensaje: 'Error al actualizar la respuesta', error});
        }
      };
      
      // Función para eliminar una respuesta por su id
    eliminarRespuestaPorId = async (req, res) => {
        try {
          const id = req.params.id;
          const respuestaEliminada = await respuestas.findByIdAndDelete(id);
          if (!respuestaEliminada) {
            return res.status(404).json({mensaje: 'Respuesta no encontrada'});
          }
          res.status(200).json({mensaje: 'Respuesta eliminada correctamente', respuesta: respuestaEliminada});
        } catch (error) {
          res.status(500).json({mensaje: 'Error al eliminar la respuesta', error});
        }
      };
}

const respuestasC = new RespuestasController();

module.exports = respuestasC;