// respuestasController.js (controlador de respuestas)

const answers = require('../models/respuestas');

class RespuestasController {

    crearRespuesta = async (req, res) => {
        try {
          const id_encuesta = req.params.id;
          const id_User = "64c307d7c7f7e40589daf5d9"
          const postRespuestas = req.body;
          const respuestas = [];

          for (let i = 0; i < postRespuestas.id.length; i++) {
            respuestas[i] = {
              id_pregunta: Number(postRespuestas.id[i]),
              texto_respuesta: postRespuestas.Texto_Respuesta[i],
              opcion_selecicionada: ''
            };
          }
          const nuevaRespuesta = new answers({id_encuesta, id_User, respuestas});
          await nuevaRespuesta.save();
          res.status(201).json({mensaje: 'Respuesta agreagada correctamente', respuesta: nuevaRespuesta});
        } catch (error) {
          res.status(500).json({mensaje: 'Error al registrar respuesta', error});
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
}

const respuestasC = new RespuestasController();

module.exports = respuestasC;